import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Wrapper from "../components/Wrapper";
import Picker from "../components/Picker";
import Separator from "../components/Separator";
import AddressInput from "../components/Checkout/AddressInput";
import { COLORS } from "../assets/design";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { deviceStorage } from "../storage/deviceStorage";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { showToast } from "./util";
const data = [
  {
    label: "Pilih Provinsi",
    value: "0",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
  {
    label: "Jawa Barat",
    value: "1",
  },
  {
    label: "Banten",
    value: "2",
  },
  {
    label: "DKI Jakarta",
    value: "3",
  },
];

export default function AddAddress() {
  const [provinceLabel, setProvinceLabel] = useState("Pilih Provinsi");
  const [stateLabel, setStateLabel] = useState("Pilih Kabupaten/Kota");

  const [name, setName] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [states, setStates] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [loading, setLoading] = useState(false);

  const [province, setProvince] = useState();
  const [state, setState] = useState();

  const provincePickHandler = (item) => {
    setProvinceLabel(item.label);
    setProvince(item.id);
  };
  const statePickHandler = (item) => {
    setStateLabel(item.label);
    setState(item.id);
  };

  const changePostalCodeHandler = (text) => {
    if (text.length > 6) {
      showToast("Kode pos tidak boleh lebih dari 6 karakter");
      return;
    }
    if (isNaN(text)) {
      showToast("Kode pos harus berupa angka");
      return;
    }
    setPostalCode(text);
  };

  const submitHandler = async () => {
    if (name.length === 0) {
      showToast("Nama harus diisi!");
      return;
    }
    if (province === 0) {
      showToast("Provinsi harus diisi!");
      return;
    }
    if (state === 0) {
      showToast("Kabupaten/Kota harus diisi!");
      return;
    }
    if (postalCode.length === 0) {
      showToast("Kode pos harus diisi!");
      return;
    }
    setLoading(true);
    const token = await deviceStorage.getItem("refresh_token");
    const body = {
      name: name,
      state_id: state,
      province_id: province,
      postal_code: postalCode,
      address_detail: addressDetail,
    };
    axios
      .post(`${API_BASE_URL}/addresses`, body, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        showToast("Alamat berhasil ditambahkan");
        setLoading(false);
      })
      .catch((err) => {
        showToast("Alamat gagal ditambahkan, coba lagi nanti");
        setLoading(false);
      });
  };
  useEffect(() => {
    const fetchProvinces = async () => {
      const token = await deviceStorage.getItem("refresh_token");
      axios
        .get(`${API_BASE_URL}/provinces`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          const convertedData = res.data.data.map((it) => ({
            id: it.province_id,
            label: it.province,
          }));
          setProvinces(convertedData);
        })
        .catch((err) => {
          setError(err);
        });
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      const token = await deviceStorage.getItem("refresh_token");
      axios
        .get(`${API_BASE_URL}/states?province=${province}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((res) => {
          const convertedData = res.data.data.map((it) => ({
            id: it.city_id,
            label: `${it.type} ${it.city_name}`,
          }));
          setStates(convertedData);
        })
        .catch((err) => {
          showToast("Terjadi kesalahan, coba lagi nanti");
          setError(err);
        });
    };
    if (province) {
      fetchStates();
    }
  }, [province]);
  return (
    <View style={styles.whiteBG}>
      <Wrapper>
        <Separator size={10} />
        <Input
          placeholder={"Beri nama untuk alamat ini"}
          value={name}
          setValue={setName}
        />
        <Separator size={20} />
        <Picker
          data={provinces}
          label={provinceLabel}
          onPick={provincePickHandler}
          Icon={<DropdownIcon />}
        />
        <Separator size={20} />
        <Picker
          data={states}
          Icon={<DropdownIcon />}
          label={stateLabel}
          onPick={statePickHandler}
        />
        <Separator size={20} />
        <Input
          placeholder={"kodepos"}
          value={postalCode}
          setValue={changePostalCodeHandler}
        />
        <Separator size={15} />
        <AddressInput value={addressDetail} setValue={setAddressDetail} />
        <Separator size={15} />
        <TouchableOpacity
          onPress={submitHandler}
          disabled={loading}
          activeOpacity={0.6}
          style={styles.btn}
        >
          {loading ? (
            <ActivityIndicator
              size={"large"}
              animating={true}
              color={"white"}
            />
          ) : (
            <Text style={styles.btnTxt}>Tambah Alamat</Text>
          )}
        </TouchableOpacity>
      </Wrapper>
    </View>
  );
}

const DropdownIcon = () => (
  <FontAwesome name="caret-down" size={17} color={COLORS.gray} />
);

const styles = StyleSheet.create({
  whiteBG: {
    backgroundColor: "white",
    flex: 1,
  },
  btn: {
    backgroundColor: COLORS.mainBlue,
    alignItems: "center",
    borderRadius: 4,
    elevation: 2,
  },
  btnTxt: {
    color: "white",
    padding: 9,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
});
