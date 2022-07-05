import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import HistoryItem from "../components/History/HistoryItem";
import Wrapper from "../components/Wrapper";
import { deviceStorage } from "../storage/deviceStorage";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { showToast } from "./util";
import { Skeleton } from "@rneui/themed";
import Separator from "../components/Separator";
import { UserContext } from "../context/UserContext";
import NotLogin from "../components/NotLogin";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin } = useContext(UserContext);
  const refreshTriggerer = () => {
    setRefreshTrigger((prev) => !prev);
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      const token = await deviceStorage.getItem("refresh_token");
      const url = `${API_BASE_URL}/transactions`;
      const headers = {
        Authorization: `bearer ${token}`,
      };
      try {
        const resp = await axios.get(url, { headers });
        setTransactions(resp.data.data);
        setIsLoading(false);
      } catch (err) {
        showToast("Gagal mengambil data transaksi, coba lagi!");
        setIsLoading(false);
      }
    };
    if (isLogin) {
      fetchTransactions();
    }
  }, [refreshTrigger]);

  return (
    <View>
      <Wrapper>
        {!isLogin && <NotLogin />}
        {!isLoading
          ? isLogin && (
              <FlatList
                refreshing={isLoading}
                onRefresh={refreshTriggerer}
                data={transactions}
                renderItem={({ item, idx }) => (
                  <HistoryItem
                    date={item.created_at_str}
                    price={item.price}
                    status={item.status}
                    key={idx}
                    list={item.items}
                    paymentUrl={item.payment_url}
                  />
                )}
                keyExtractor={(i, id) => id}
                showsVerticalScrollIndicator={false}
              />
            )
          : isLogin && (
              <>
                <Skeleton animation="pulse" style={styles.skeleton} />
                <Separator size={10} />
                <Skeleton animation="pulse" style={styles.skeleton} />
                <Separator size={10} />
                <Skeleton animation="pulse" style={styles.skeleton} />
              </>
            )}
      </Wrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    height: 100,
  },
});
