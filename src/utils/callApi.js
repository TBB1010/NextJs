"use client";

import useSWR from "swr";
import axios from "axios";

export default function getData() {
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR(
    "http://localhost:8000/blogs",
    fetcher
  );
}
