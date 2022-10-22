import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import newslettersService from '../../../../services/newslettersService';
import blogService from '../../../../services/blogService';
import toastr from 'toastr';
import ContentCard from './ContentCard';

const Content = () => {
    const [contentData, setContentData] = useState([]);
    useEffect(() => {
        blogService.getBlogPaginated(0, 1).then(onGetBlogSuccess).catch(onGetBlogError);
    }, []);

    const mapBlog = (blogObj) => {
        let result = {
            id: blogObj.id,
            img: blogObj.imageUrl,
            tabTitle: 'Latest Blog Post',
            text: 'Temporary blog text until the API returns blog text',
            title: blogObj.title,
            icon: 'mdi mdi-home-variant',
        };
        return result;
    };
    const onGetBlogSuccess = (response) => {
        let data = response.item.pagedItems.map(mapBlog);
        setContentData((prevState) => {
            let bd = { ...prevState };
            bd = [...prevState, ...data];
            return bd;
        });
        toastr.success('Get blog success');
        newslettersService.paginatedNewsletters(0, 1).then(onGetNewsletterSuccess).catch(onGetNewsletterError);
    };
    const onGetBlogError = (err) => {
        toastr.error(`Get blog error ${err}`);
    };
    const onGetNewsletterSuccess = (response) => {
        let data = response.item.pagedItems.map(mapNewsletter);

        setContentData((prevState) => {
            let nd = { ...prevState };
            nd = [...prevState, ...data];
            return nd;
        });
        toastr.success('Get newsletter success');
    };
    const onGetNewsletterError = (err) => {
        toastr.error(`Get blog error ${err}`);
    };
    const mapNewsletter = (newsletterObj) => {
        let result = {
            id: newsletterObj.id,
            tabTitle: 'Latest Newsletter',
            img: newsletterObj.coverPhoto,
            text: 'Temp Newsletter text until newsletter API returns a newsletter text',
            title: newsletterObj.name,
            icon: 'mdi mdi-home-variant',
        };
        return result;
    };
    return <ContentCard data={contentData} />;
};

export default Content;
