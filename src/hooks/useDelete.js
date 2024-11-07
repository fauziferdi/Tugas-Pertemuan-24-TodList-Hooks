import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const useDelete = (url) => {
  const [dataDelete, setDataDelete] = useState(null);

  const deleteActivity = async (id) => {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Ingin Menghapus Data Ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios
            .delete(`${url}/${id}`)
            .then((response) => {
              console.log(response);
              setDataDelete(response.data);
              Swal.fire({
                title: "Selamat!",
                text: `Data ${response.data.title} Berhasil Terhapus.`,
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return { dataDelete, deleteActivity };
};

export default useDelete;
