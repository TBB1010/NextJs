import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface IProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

function CreateModal(props: IProps) {
  const { showModal, setShowModal } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleClose = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!title) {
      toast.error("Title empty!!!!");
      return;
    }
    if (!author) {
      toast.error("Author empty!!!!");
      return;
    }
    if (!content) {
      toast.error("Content empty!!!!");
      return;
    }
    axios({
      baseURL: "http://localhost:8000",
      method: "post",
      url: "/blogs",
      data: {
        title: title,
        author: author,
        content: content,
      },
    }).then((response) => {
      if (response) {
        console.log(response.data);
        toast.success("Success add new a blog...!");
        handleClose();
        mutate("http://localhost:8000/blogs");
      }
    });
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#000" }}>Add new a blog</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ color: "#000" }}>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author..."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateModal;
