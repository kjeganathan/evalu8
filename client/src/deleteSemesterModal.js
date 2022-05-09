import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteSemesterModal = (props) => {

    let handleDeletion = () => {
        let coursedata = JSON.parse(localStorage.getItem('course'));
        let admindata = JSON.parse(localStorage.getItem('username'));

        const data = {
            admin: admindata,
            course: coursedata
          };

        fetch("/api/deleteSemesterTables", {
            method: "POST",
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: { "Content-Type": "application/json" },
        }).then(s => {
            window.alert("You have successufully deleted all semester data!");
          }).then(s => {
            props.onHide;
          });
      };


    return (
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="deleteModal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      fill="currentColor"
                      class="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    &nbsp;
              Confirm deletion of all semester data
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <center>
                    <br />
                    <Button
                      className="btn btn-dark"
                      id="professor-signup"
                      onClick={handleDeletion}
                    >
                      Yes, I want to delete
                    </Button>
                    &nbsp; &nbsp; &nbsp;
                    
                    &nbsp;
                    <Button
                      className="btn btn-dark"
                      id="student-signup"
                      onClick={props.onHide}
                    >
                      No, bring me back
                    </Button>
                    <br />
                    <br />
                  </center>
          </Modal.Body>
          
        </Modal>
      );
};

export default DeleteSemesterModal