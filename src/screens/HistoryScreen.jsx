import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
//import axios from 'axios';

const HistoryScreen = ({ onBack, user }) => {
  const [history, setHistory] = useState([]);
    console.log(user.userID);

  const fetchHistory = async () => {
    try {
      const res = await fetch(`http://10.0.2.2:3000/history/${user.userID}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Get history failed");
        }
        console.log(data);
        setHistory(data);
    } catch (error) {
      console.log("Lỗi lấy lịch sử:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const renderItem = ({ item }) => (
    console.log(item),
    <View style={styles.card}>
      <Text style={styles.room}>Phòng: {item.room.name}</Text>
      <Text>Khách: {item.formData.name}</Text>
      <Text>Ngày đặt: {item.createdAt}</Text>
      <Text>Giá: {item.room.price} VND</Text>
      <Text>Trang Thai: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        {/* Back Button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Lịch sử đặt phòng</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  room: { fontWeight: 'bold', marginBottom: 5 },
});
