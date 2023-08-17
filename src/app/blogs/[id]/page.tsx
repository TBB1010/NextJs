"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import useSWR, { Fetcher } from "swr";

export default function ViewBlogs({ params }: { params: { id: number } }) {
  //   axios({
  //     method: "get",
  //     url: `http://localhost:8000/blogs/${params.id}`,
  //   }).then((res) => res.data);
  const router = useRouter();
  const fetcher: Fetcher<IBlog, string> = (url: string) =>
    axios.get(url).then((response) => response.data);

  const { data, error, isLoading } = useSWR(
    `http://localhost:8000/blogs/${params.id}`,
    fetcher
  );

  if (error) return <Container fluid>An error has database ....</Container>;
  if (isLoading) return <Container fluid>Loading....</Container>;

  return (
    <Container>
      <Card style={{ width: "100%" }} className="mt-8">
        <Card.Body>
          <Card.Title>{data?.title}</Card.Title>
          <Card.Text>{data?.content}</Card.Text>
          <Button variant="primary" onClick={() => router.push("/")}>
            Go Back Home
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
