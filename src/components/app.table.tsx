"use client";

import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import UpdateModal from "./update.modal";
import CreateModal from "./create.modal";
import Link from "next/link";
import DeleteModal from "./delete.modal";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
}

export default function TableCustom(props: IProps) {
  const { blogs } = props;
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    if (
      confirm(
        `Dữ liệu đã xóa không thể phục hồi lại,với id(${id}) bạn có chắc chắn muốn xóa không?`
      ) == true
    ) {
      axios({
        url: `http://localhost:8000/blogs/${id}`,
        method: "delete",
      }).then((response) => {
        console.log(response.data);
        toast.error(`Delete success a blog id ${id}`);
        mutate("http://localhost:8000/blogs");
        return response.data;
      });
    }
  };

  return (
    <>
      <Col
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <h2>Table blogs</h2>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Add new
        </Button>
      </Col>
      <Table striped bordered hover variant="dark" className="mt-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Link className="btn btn-primary" href={`/blogs/${item.id}`}>
                    View
                  </Link>
                  <Button
                    className="mx-3"
                    variant="warning"
                    onClick={() => {
                      setBlog(item);
                      setShowModalUpdate(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    // onClick={() => {
                    //   setBlog(item);
                    //   setShowModalDelete(true);
                    // }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <UpdateModal
        blog={blog}
        setBlog={setBlog}
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
      />
      <CreateModal showModal={showModal} setShowModal={setShowModal} />
      <DeleteModal
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        blog={blog}
        setBlog={setBlog}
      />
    </>
  );
}
