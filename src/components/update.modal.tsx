import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id),
        setTitle(blog.title),
        setAuthor(blog.author),
        setContent(blog.content);
    }
  }, [blog]);

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
      method: "put",
      url: `/blogs/${id}`,
      data: {
        title: title,
        author: author,
        content: content,
      },
    }).then((response) => {
      if (response) {
        console.log(response.data);
        toast.warning("Success update a blog...!");
        setShowModalUpdate(false);
        mutate(`http://localhost:8000/blogs`);
      }
    });
  };

  return (
    <Modal
      show={showModalUpdate}
      onHide={() => setShowModalUpdate(false)}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#000" }}>Update a blog</Modal.Title>
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
        <Button variant="secondary" onClick={() => setShowModalUpdate(false)}>
          Close
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
