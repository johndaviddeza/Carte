import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BlogCard = (props) => {
    const blog = props.blogData;
    return (
        <Card>
            <Card.Body>
                <Card.Title as="h5">{blog.title}</Card.Title>
                <Card.Text>{blog.body}</Card.Text>
                <Card.Link href="#" className="text-centered">
                    Read more
                </Card.Link>
            </Card.Body>
        </Card>
    );
};

BlogCard.propTypes = {
    blogData: PropTypes.shape(
        {
            title: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
        }.isRequired
    ),
};

export default BlogCard;
