import React, { useEffect, useState } from "react";

//bu dosya localstorage'a kaydedilen token'i donduren bir hooks olacak
const useToken = () => {
  const [token, setToken] = useState("");

  //sayfa yuklendiginde auth adindaki verileri token icerisine setlicek
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("auth")));
  }, []);

  return [token];
};

export default useToken;
