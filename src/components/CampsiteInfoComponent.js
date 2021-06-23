import React, { Component } from "react"
import { Card, CardBody, CardImg, CardTitle, CardText} from "reactstrap"


class CampsiteInfo extends Component {

    renderCampsite(campsite) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )};

    renderComments(comments) {
        if (comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {return(
                    <div>
                        <div>
                            {comment.text}
                        </div>
                        <div>
                            {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </div>
                    </div>
                        )
                    } 
                   
                    )}
                </div>
            )}
            return <div></div>
    };

    render() {
        if(this.props.campsite) { 
            return (
                <div className="col-md-6">
                    {this.renderCampsite(this.props.campsite)},
                    {this.renderComments(this.props.campsite.comments)}
                </div>
            )} else {
            return (
            <div>
            </div>
        )}      
    };
}

export default CampsiteInfo
