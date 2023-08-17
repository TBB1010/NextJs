import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface IProps {
  showModalDelete: boolean;
  setShowModalDelete: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function DeleteModal(props: IProps) {
  const { showModalDelete, setShowModalDelete, setBlog, blog } = props;
  // const [title, setTitle] = useState<string>("");
  // const [author, setAuthor] = useState<string>("");
  // const [content, setContent] = useState<string>("");

  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleDelete = () => {
    axios({
      baseURL: "http://localhost:8000",
      method: "delete",
      url: `/blogs/${blog?.id}`,
      // data: {
      //   title: title,
      //   author: author,
      //   content: content,
      // },
    }).then((response) => {
      if (response) {
        console.log(response.data);
        toast.error("Delete success a blog...!");
        handleClose();
        mutate("http://localhost:8000/blogs");
      }
    });
  };

  return (
    <Modal
      show={showModalDelete}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
      className="mt-5"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#000" }}>Delete a blog</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        <Form>
          <Form.Label className="mt-3">
            Dữ liệu đã xóa không thể phục hồi lại, bạn có chắc chắn muốn xóa
            không?
          </Form.Label>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
