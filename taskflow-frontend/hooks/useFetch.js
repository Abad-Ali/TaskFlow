"use client"
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res = await fetch(url);
    //     if (!res.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     const result = await res.json();
    //     setData(result);
    //   } catch (error) {
    //     setError(error.message);
    //   }
    // };
    const fetchData = async () => {
        try {
          const token = localStorage.getItem("token"); // Retrieve token from storage
          if (!token) {
            throw new Error("No token found. Please login again.");
          }
      
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // Add the token to the request header
            },
          });
      
          if (!res.ok) {
            throw new Error("Failed to fetch data. Status: " + res.status);
          }
      
          const data = await res.json();
          setTasks(data); // Assuming setTasks is used to update the state
        } catch (error) {
          console.error("Error:", error);
          setError("Failed to fetch data"); // Handle error state for display
        }
      };
    

    fetchData();
  }, [url]);

  return { data, error };
};
