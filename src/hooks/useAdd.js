import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const useAdd = (url, formValues) => {
  const [dataAdd, setDataAdd] = useState(null);

  const addActivity = async () => {
    try {
      const response = await axios.post(url, formValues);
      setDataAdd(response.data);
      Swal.fire({
        title: "Selamat!",
        text: "Data Berhasil Ditambahkan!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { dataAdd, addActivity };
};

export default useAdd;
