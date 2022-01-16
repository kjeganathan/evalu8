import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Collapsible from "react-collapsible";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const EvaluationModal = (props) => {
    const managerEval = true;
    const peerEval = true;
    const goalSettingEval = true;
    //We should have another eval option called other eval which lets a user write the other eval options

    const numEvals = 3;
    //Only keep the eval numbers in record which are marked as true or existent
    const numManagerEvals = 3;
    const numPeerEvals = 3;
    const numGoalSettingEvals = 3;

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Evaluation Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Collapsible id="meeting-list" trigger="Manager Evaluation">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Completed Evaluations</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td>1</td>
              <td>Jane</td>
              <td>Ottawa</td>
              <td>
                <Form>
                  {["radio"].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                      <Form.Check
                        inline
                        label="Manager Eval 1"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      />
                      <Form.Check
                        inline
                        label="Manager Eval 2"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                      <Form.Check
                        inline
                        label="Manager Eval 3"
                        name="group1"
                        type={type}
                        id={`inline-${type}-3`}
                      />
                    </div>
                  ))}
                </Form>
              </td>
            </tr>
          </tbody>
        </Table>
      </Collapsible>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
};

export default EvaluationModal