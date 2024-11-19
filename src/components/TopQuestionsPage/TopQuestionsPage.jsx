import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const DifficultySection = styled.div`
  margin-bottom: 2rem;
  background-color: ${(props) => props.bgColor || '#eaeaea'};
  border-radius: 8px;
  padding: 1rem;
`;

const TopicTitle = styled.summary`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
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
  margin-left: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const SolvedText = styled.span`
  margin-left: 1rem;
  color: green;
  font-weight: bold;
`;

const TopQuestionsPage = () => {
  const codingProblems = {
    Array: [
      { problem: "Two Sum", url: "https://leetcode.com/problems/two-sum/" },
      { problem: "Palindrome Number", url: "https://leetcode.com/problems/palindrome-number/" },
      { problem: "Valid Parentheses", url: "https://leetcode.com/problems/valid-parentheses/" },
      { problem: "Roman to Integer", url: "https://leetcode.com/problems/roman-to-integer/" },
      { problem: "Remove Duplicates from Sorted Array", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
      { problem: "Climbing Stairs", url: "https://leetcode.com/problems/climbing-stairs/" },
      { problem: "Maximum Subarray", url: "https://leetcode.com/problems/maximum-subarray/" },
      { problem: "Merge Two Sorted Lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { problem: "Best Time to Buy and Sell Stock", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
      { problem: "Symmetric Tree", url: "https://leetcode.com/problems/symmetric-tree/" },
      { problem: "Array", url: "https://leetcode.com/tag/array/" },
      { problem: "Reverse the array", url: "https://leetcode.com/problems/reverse-array/" },
      { problem: "Maximum and minimum of an array using minimum number of comparisons", url: "https://leetcode.com/problems/minimum-number-of-comparisons/" },
    ],
    String: [
      { problem: "Longest Substring Without Repeating Characters", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { problem: "3Sum", url: "https://leetcode.com/problems/3sum/" },
      { problem: "Container With Most Water", url: "https://leetcode.com/problems/container-with-most-water/" },
      { problem: "Product of Array Except Self", url: "https://leetcode.com/problems/product-of-array-except-self/" },
      { problem: "Kth Largest Element in an Array", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
      { problem: "Top K Frequent Elements", url: "https://leetcode.com/problems/top-k-frequent-elements/" },
      { problem: "Binary Tree Level Order Traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { problem: "Word Search", url: "https://leetcode.com/problems/word-search/" },
    ],
    LinkedList: [
      { problem: "Reverse a Linked List", url: "https://leetcode.com/problems/reverse-linked-list/" },
      { problem: "Detect Loop in Linked List", url: "https://leetcode.com/problems/linked-list-cycle/" },
      { problem: "Find the middle of a Linked List", url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
      { problem: "Merge two sorted linked lists", url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
      { problem: "Flattening a linked list", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
      { problem: "Sort a linked list of 0s, 1s and 2s", url: "https://leetcode.com/problems/sort-list/" },
      { problem: "Remove Loop in Linked List", url: "https://leetcode.com/problems/linked-list-cycle-ii/" },
      { problem: "Clone a linked list with next and random pointer", url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
      { problem: "Delete without head pointer", url: "https://www.geeksforgeeks.org/delete-without-head-pointer/" },
      { problem: "Intersection Point in Y Shaped Linked Lists", url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { problem: "Pairwise swap elements of a linked list", url: "https://leetcode.com/problems/swap-nodes-in-pairs/" },
      { problem: "Find length of loop in Linked List", url: "https://www.geeksforgeeks.org/find-length-loop-linked-list/" },
      { problem: "Reverse a linked list in groups of given size", url: "https://www.geeksforgeeks.org/reverse-a-linked-list-in-groups-of-given-size/" },
      { problem: "Detect loop using Floyd’s Cycle-Finding Algorithm", url: "https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/" },
      { problem: "Add two numbers represented by linked lists", url: "https://leetcode.com/problems/add-two-numbers/" },
      { problem: "Multiply two numbers represented by linked lists", url: "https://leetcode.com/problems/multiply-strings/" },
      { problem: "Merge k sorted linked lists", url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
      { problem: "Remove Duplicates from a sorted linked list", url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
      { problem: "Remove Duplicates from an unsorted linked list", url: "https://www.geeksforgeeks.org/remove-duplicates-from-an-unsorted-linked-list/" },
      { problem: "Rotate a Linked List", url: "https://leetcode.com/problems/rotate-list/" },
      { problem: "Get the Nth node from the end of a linked list", url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
      { problem: "Find intersection of two linked lists", url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
      { problem: "Implement a stack using linked list", url: "https://www.geeksforgeeks.org/implement-stack-using-linked-list/" },
      { problem: "Implement a queue using linked list", url: "https://www.geeksforgeeks.org/implement-queue-using-linked-list/" },
      { problem: "Remove all duplicates from a linked list", url: "https://www.geeksforgeeks.org/remove-duplicates-from-a-sorted-linked-list/" },
      { problem: "Reverse alternate K nodes in a linked list", url: "https://www.geeksforgeeks.org/reverse-alternate-k-nodes-in-a-linked-list/" },
      { problem: "Rotate a linked list clockwise", url: "https://www.geeksforgeeks.org/rotate-a-linked-list-clockwise/" },
      { problem: "Swap nodes in pairs", url: "https://leetcode.com/problems/swap-nodes-in-pairs/" },
      { problem: "Flatten a multi-level linked list", url: "https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/" },
    ],
    Tree: [
      { problem: "Inorder traversal of a binary tree", url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
      { problem: "Preorder traversal of a binary tree", url: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
      { problem: "Postorder traversal of a binary tree", url: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
      { problem: "Level order traversal", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { problem: "Print all nodes at distance k from a given node", url: "https://www.geeksforgeeks.org/print-nodes-distance-k-given-node-binary-tree/" },
      { problem: "Check if two trees are identical", url: "https://www.geeksforgeeks.org/check-binary-trees-identical/" },
      { problem: "Check if a binary tree is balanced", url: "https://leetcode.com/problems/balanced-binary-tree/" },
      { problem: "Find height of a binary tree", url: "https://www.geeksforgeeks.org/height-binary-tree/" },
      { problem: "Find diameter of a binary tree", url: "https://www.geeksforgeeks.org/diameter-of-a-binary-tree/" },
      { problem: "Convert a binary tree to its mirror", url: "https://www.geeksforgeeks.org/mirror-tree/" },
      { problem: "Lowest Common Ancestor of a binary tree", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { problem: "Find all leaf nodes of a binary tree", url: "https://www.geeksforgeeks.org/find-all-leaf-nodes-of-a-binary-tree/" },
      { problem: "Count total number of nodes in a binary tree", url: "https://www.geeksforgeeks.org/count-total-number-nodes-in-a-binary-tree/" },
      { problem: "Find all ancestors of a given node in a binary tree", url: "https://www.geeksforgeeks.org/find-all-ancestors-of-a-given-node-in-a-binary-tree/" },
      { problem: "Level order traversal in spiral form", url: "https://www.geeksforgeeks.org/level-order-traversal-in-spiral-form/" },
      { problem: "Maximum path sum in a binary tree", url: "https://www.geeksforgeeks.org/maximum-path-sum-binary-tree/" },
      { problem: "Convert a binary tree into its sum tree", url: "https://www.geeksforgeeks.org/convert-a-binary-tree-to-sum-tree/" },
      { problem: "Serialize and Deserialize a binary tree", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
      { problem: "Construct Binary Tree from Preorder and Inorder Traversal", url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
      { problem: "Construct Binary Tree from Inorder and Postorder Traversal", url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
      { problem: "Kth smallest element in a BST", url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
      { problem: "Vertical order traversal of a binary tree", url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" },
      { problem: "Find all duplicates in a binary tree", url: "https://www.geeksforgeeks.org/find-duplicates-in-binary-tree/" },
      { problem: "Check if a binary tree is a binary search tree", url: "https://www.geeksforgeeks.org/check-binary-tree-binary-search-tree/" },
      { problem: "Find maximum width of a binary tree", url: "https://www.geeksforgeeks.org/find-maximum-width-of-a-binary-tree/" },
      { problem: "Count leaf nodes in a binary tree", url: "https://www.geeksforgeeks.org/count-leaf-nodes-binary-tree/" },
    ],
    Graph: [
      { problem: "Depth First Search", url: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" },
      { problem: "Breadth First Search", url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/" },
      { problem: "Find if there is a path between two nodes", url: "https://www.geeksforgeeks.org/find-if-there-is-a-path-between-two-nodes-in-a-graph/" },
      { problem: "Detect Cycle in a Graph", url: "https://www.geeksforgeeks.org/detect-cycle-in-a-graph/" },
      { problem: "Topological Sort", url: "https://www.geeksforgeeks.org/topological-sorting/" },
      { problem: "Dijkstra's Algorithm", url: "https://www.geeksforgeeks.org/implementation-dijkstras-shortest-path-algorithm-using-priority-queue/" },
      { problem: "Find shortest path in a weighted graph", url: "https://www.geeksforgeeks.org/shortest-path-unweighted-graph-using-bfs/" },
      { problem: "Find number of connected components in an undirected graph", url: "https://www.geeksforgeeks.org/count-connected-components-undirected-graph/" },
      { problem: "Find shortest path in an unweighted graph", url: "https://www.geeksforgeeks.org/shortest-path-unweighted-graph-using-bfs/" },
      { problem: "Check if a graph is bipartite", url: "https://www.geeksforgeeks.org/check-if-a-given-graph-is-bipartite/" },
      { problem: "Find shortest path in a grid with obstacles", url: "https://www.geeksforgeeks.org/shortest-path-in-a-binary-matrix/" },
      { problem: "Kruskal's Algorithm", url: "https://www.geeksforgeeks.org/kruskals-algorithm-using-disjoint-set-union/" },
      { problem: "Prim's Algorithm", url: "https://www.geeksforgeeks.org/prims-minimum-spanning-tree-algorithm-using-priority-queue/" },
      { problem: "Find if there is a Hamiltonian Cycle in a graph", url: "https://www.geeksforgeeks.org/hamiltonian-cycle-backtracking-2/" },
      { problem: "Find if there is a Eulerian Path in a graph", url: "https://www.geeksforgeeks.org/eulerian-path-graph/" },
      { problem: "Find if a graph is connected", url: "https://www.geeksforgeeks.org/check-if-a-graph-is-connected-or-not/" },
    ],
    Miscellaneous: [
      { problem: "Validate Sudoku", url: "https://leetcode.com/problems/valid-sudoku/" },
      { problem: "Search in Rotated Sorted Array", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
      { problem: "Median of Two Sorted Arrays", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { problem: "N-Queens", url: "https://leetcode.com/problems/n-queens/" },
      { problem: "Generate Parentheses", url: "https://leetcode.com/problems/generate-parentheses/" },
      { problem: "Longest Valid Parentheses", url: "https://leetcode.com/problems/longest-valid-parentheses/" },
      { problem: "Permutations", url: "https://leetcode.com/problems/permutations/" },
      { problem: "Combinations", url: "https://leetcode.com/problems/combinations/" },
      { problem: "Letter Combinations of a Phone Number", url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
      { problem: "Subsets", url: "https://leetcode.com/problems/subsets/" },
      { problem: "Word Search II", url: "https://leetcode.com/problems/word-search-ii/" },
      { problem: "Unique Paths", url: "https://leetcode.com/problems/unique-paths/" },
      { problem: "House Robber", url: "https://leetcode.com/problems/house-robber/" },
      { problem: "Number of Islands", url: "https://leetcode.com/problems/number-of-islands/" },
      { problem: "Course Schedule", url: "https://leetcode.com/problems/course-schedule/" },
      { problem: "Candy", url: "https://leetcode.com/problems/candy/" },
      { problem: "Palindrome Partitioning", url: "https://leetcode.com/problems/palindrome-partitioning/" },
      { problem: "Unique Binary Search Trees", url: "https://leetcode.com/problems/unique-binary-search-trees/" },
      { problem: "Coin Change", url: "https://leetcode.com/problems/coin-change/" },
      { problem: "Find the Celebrity", url: "https://leetcode.com/problems/find-the-celebrity/" },
    ],
  };

  const [solvedProblems, setSolvedProblems] = useState({});

  const handleCheckboxChange = (topic, index) => {
    setSolvedProblems((prevSolved) => ({
      ...prevSolved,
      [topic]: {
        ...prevSolved[topic],
        [index]: !prevSolved[topic]?.[index],
      },
    }));
  };

  const getSolvedCount = (topic) => {
    return Object.values(solvedProblems[topic] || {}).filter(Boolean).length;
  };

  const topicColors = {
    Array: '#87CEEB',
    String: '#87CEEB',
    LinkedList: '#87CEEB',
    Tree: '#87CEEB',
    Graph: '#87CEEB',
    Miscellaneous: '#87CEEB',
  };

  return (
    <Container>
      <h1>Top Coding Questions</h1>
      {Object.keys(codingProblems).map((topic) => {
        const totalQuestions = codingProblems[topic].length;
        const solvedCount = getSolvedCount(topic);

        return (
          <DifficultySection key={topic} bgColor={topicColors[topic]}>
            <details>
              <TopicTitle>
                {topic} ({solvedCount}/{totalQuestions})
              </TopicTitle>
              <QuestionList>
                {codingProblems[topic].map((question, index) => (
                  <QuestionItem key={index}>
                    <Checkbox
                      type="checkbox"
                      checked={solvedProblems[topic]?.[index] || false}
                      onChange={() => handleCheckboxChange(topic, index)}
                    />
                    {question.problem}
                    <SolveButton href={question.url} target="_blank" rel="noopener noreferrer">
                      Solve
                    </SolveButton>
                    {solvedProblems[topic]?.[index] && <SolvedText>Solved</SolvedText>}
                  </QuestionItem>
                ))}
              </QuestionList>
            </details>
          </DifficultySection>
        );
      })}
    </Container>
  );
};

export default TopQuestionsPage;
