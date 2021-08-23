import React, { Component} from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, Button, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { Link } from 'react-router-dom'; 
import { Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from './LoadingComponent'; 
import { baseUrl } from '../shared/baseUrl'; 
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = len => val => !(val) || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <FadeTransform 
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card>
                            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                            <CardBody>
                                <CardTitle>{campsite.name}</CardTitle>
                                <CardText>{campsite.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
            </div>
        );
    }

function RenderComments({comments, postComment, campsiteId}) {
        if (comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    <Stagger in>
                    {comments.map(comment => {
                        return(
                            <Fade in key={comment.id}>
                                <div>
                                    <p>{comment.text}</p>
                                    {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </div>
                            </Fade>
                        );
                    })}
                    </Stagger>
                    <CommentForm campsiteId={campsiteId} postComment={postComment} />
                </div>
            );
        }
        return <div />;

}      

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: !true,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text) 
        
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name </Label>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="Your Name"
                                className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be below 15 characters'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    /> 
                            </div>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function CampsiteInfo(props) {
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading /> 
                </div>
            </div>
        )
    }
    if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    
    if(props.campsite) { 
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                            <RenderCampsite campsite={props.campsite} />
                            <RenderComments
                                comments={props.comments} 
                                addComment={props.postComment}
                                campsiteId={props.campsite.id}
                            />
                     </div>
                 </div>
            );
        }
    return <div />;   
 }


 /*  
class CommentForm extends Component {
    constructor(props) {
    super(props);
    
    this.state = {
        author:'',
        select:'',
        isModalOpen: !true,
        touched: {
            author: false
        }
    };

    /*    return() {

            <div>
            <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
                <Modal isOpen={modal} toggle={toggle} className={className}>
                    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                        <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="select" md={2}>Select</Label>
                            <Col md={10}>
                                <Control.select model=".select" id="select" name="select"
                                    placeholder="select"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={2}>Author</Label>
                            <Col md={10}>
                                <Control.text model="author" id="author" name="author"
                                    placeholder="your name"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.text model=".Comment" id="Comment" name="comment"
                                    placeholder="comment"
                                    className="form-control"
                                />
                            </Col>
                        </Row>
                        </LocalForm>
                        </ModalBody>
                    <ModalFooter>
                    <Button boolean="outline" className="fa-lg fa-pencil">Submit Comment</Button>
                    </ModalFooter>
                </Modal>
            </div>

        }
        }
    }
*/
// export const baseUrl = 'http://127.0.0.1:3001/'; 

export default CampsiteInfo;
