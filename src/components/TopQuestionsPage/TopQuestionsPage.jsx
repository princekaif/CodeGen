import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const DifficultySection = styled.div`
  margin-bottom: 2rem;
`;

const QuestionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const QuestionItem = styled.li`
  margin: 0.5rem 0;
  padding: 1rem;
  background-color: #f7f7f7;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SolveButton = styled.a`
  background-color: #0097d7;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
`;

const TopQuestionsPage = () => {
  // LeetCode questions with corresponding URLs
  const questions = {
    easy: [
      { name: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
      { name: "Palindrome Number", url: "https://leetcode.com/problems/palindrome-number/" },
      { name: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
      { name: "Roman to Integer", url: "https://leetcode.com/problems/roman-to-integer/" },
      { name: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { name: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
      { name: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
      { name: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { name: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { name: "Symmetric Tree", url: "https://leetcode.com/problems/symmetric-tree/" },
      // Add more easy questions here...
    ],
    medium: [
      { name: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { name: "3Sum", url: "https://leetcode.com/problems/3sum/" },
      { name: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" },
      { name: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/" },
      { name: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { name: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { name: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { name: "Word Search", url: "https://leetcode.com/problems/word-search/" },
      // Add more medium questions here...
    ],
    hard: [
      { name: "Merge k Sorted Lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { name: "Regular Expression Matching", url: "https://leetcode.com/problems/regular-expression-matching/" },
      { name: "Sudoku Solver", url: "https://leetcode.com/problems/sudoku-solver/" },
      { name: "Trapping Rain Water", url: "https://leetcode.com/problems/trapping-rain-water/" },
      { name: "Word Ladder", url: "https://leetcode.com/problems/word-ladder/" },
      { name: "Longest Valid Parentheses", url: "https://leetcode.com/problems/longest-valid-parentheses/" },
      { name: "Minimum Window Substring", url: "https://leetcode.com/problems/minimum-window-substring/" },
      { name: "Edit Distance", url: "https://leetcode.com/problems/edit-distance/" },
      // Add more hard questions here...
    ],
  };

  return (
    <Container>
      <h1>Top Coding Questions</h1>

      {/* Easy Questions */}
      <DifficultySection>
        <h2>Easy</h2>
        <QuestionList>
          {questions.easy.map((question, index) => (
            <QuestionItem key={index}>
              {question.name}
              <SolveButton href={question.url} target="_blank" rel="noopener noreferrer">
                Solve
              </SolveButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </DifficultySection>

      {/* Medium Questions */}
      <DifficultySection>
        <h2>Medium</h2>
        <QuestionList>
          {questions.medium.map((question, index) => (
            <QuestionItem key={index}>
              {question.name}
              <SolveButton href={question.url} target="_blank" rel="noopener noreferrer">
                Solve
              </SolveButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </DifficultySection>

      {/* Hard Questions */}
      <DifficultySection>
        <h2>Hard</h2>
        <QuestionList>
          {questions.hard.map((question, index) => (
            <QuestionItem key={index}>
              {question.name}
              <SolveButton href={question.url} target="_blank" rel="noopener noreferrer">
                Solve
              </SolveButton>
            </QuestionItem>
          ))}
        </QuestionList>
      </DifficultySection>
    </Container>
  );
};

export default TopQuestionsPage;



