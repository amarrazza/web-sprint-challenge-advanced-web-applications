import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

//express was not allowing me to render 
// import { render } from 'express/lib/response';

import { render, screen } from '@testing-library/react';

const testArticle = {
    id: 'aMqwd', 
    headline: "headline", 
    createdOn: '2021-08-09T18:02:38-04:00', 
    summary: "summary", 
    body: "",  
    author: "austin"
}

const testArticleNoAuth = {
    id: 'aMqwd', 
    headline: "headline", 
    createdOn: '2021-08-09T18:02:38-04:00', 
    summary: "summary", 
    body: "",  
    
}

test("renders without error", () => {
    render(<Article article= {{}}/>)

});

test('renders headline, author from the article when passed in through props', ()=> {
    //Arrange
    render(<Article article= {testArticle}/>)
    //Act
    const headline = screen.queryByTestId("headline");
    const author = screen.queryByTestId("author");
    //Assert
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(headline).toHaveTextContent("headline");
    expect(author).toHaveTextContent("austin");

});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article= {testArticleNoAuth}/>)

    const author = screen.queryByTestId("author");

    expect(author).toBeInTheDocument();
    expect(author).toHaveTextContent("Associated Press");
});

test('executes handleDelete when the delete button is pressed', ()=> {
    //mock handleDelete function
    const mockHandleDelete = jest.fn();

    render(<Article article= {testArticle} handleDelete={mockHandleDelete} />)

    const button = screen.queryByTestId("deleteButton");
    userEvent.click(button);

    expect(mockHandleDelete).toHaveBeenCalled();
    
    

});

//Task List: 
//1. Complete all above tests. Create test article data when needed.