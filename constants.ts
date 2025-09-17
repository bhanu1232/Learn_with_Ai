import { Category, Problem, Language, Mode } from './types';

export const DSA_PROBLEMS: Category[] = [
  {
    name: 'Arrays',
    problems: [
      {
        id: 'two-sum',
        title: 'Two Sum',
        statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
        difficulty: 'Easy',
        examples: [
          { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
          { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]" },
        ]
      },
       {
        id: 'best-time-to-buy-and-sell-stock',
        title: 'Best Time to Buy and Sell Stock',
        statement: 'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.',
        difficulty: 'Easy',
        examples: [
          { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
          { input: "prices = [7,6,4,3,1]", output: "0", explanation: "In this case, no transactions are done and the max profit is 0." },
        ]
      },
      {
        id: 'contains-duplicate',
        title: 'Contains Duplicate',
        statement: 'Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.',
        difficulty: 'Easy',
        examples: [
          { input: "nums = [1, 2, 3, 1]", output: "true" },
          { input: "nums = [1, 2, 3, 4]", output: "false" },
        ],
      },
      {
        id: 'product-of-array-except-self',
        title: 'Product of Array Except Self',
        statement: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.',
        difficulty: 'Medium',
        examples: [
          { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
          { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" },
        ]
      },
      {
        id: 'max-subarray',
        title: 'Maximum Subarray',
        statement: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
        difficulty: 'Medium',
        examples: [
            { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "The subarray [4, -1, 2, 1] has the largest sum of 6." },
            { input: "nums = [5, 4, -1, 7, 8]", output: "23" }
        ]
      },
      {
        id: '3sum',
        title: '3Sum',
        statement: 'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.',
        difficulty: 'Medium',
        examples: [
          { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
          { input: "nums = [0,1,1]", output: "[]" },
        ]
      },
    ],
  },
  {
    name: 'Strings',
    problems: [
      {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        statement: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        difficulty: 'Easy',
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
            { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' }
        ]
      },
      {
        id: 'valid-anagram',
        title: 'Valid Anagram',
        statement: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
        difficulty: 'Easy',
        examples: [
          { input: 's = "anagram", t = "nagaram"', output: 'true' },
          { input: 's = "rat", t = "car"', output: 'false' },
        ],
      },
      {
        id: 'longest-substring-no-repeats',
        title: 'Longest Substring Without Repeating Characters',
        statement: 'Given a string `s`, find the length of the longest substring without repeating characters.',
        difficulty: 'Medium',
        examples: [
          { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
          { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
        ],
      },
      {
        id: 'group-anagrams',
        title: 'Group Anagrams',
        statement: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
        difficulty: 'Medium',
        examples: [
          { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
          { input: 'strs = [""]', output: '[[""]]' },
        ],
      },
    ],
  },
  {
    name: 'Linked Lists',
    problems: [
      {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        statement: 'Given the `head` of a singly linked list, reverse the list, and return the reversed list.',
        difficulty: 'Easy',
        examples: [
            { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]" },
            { input: "head = [1, 2]", output: "[2, 1]" }
        ]
      },
      {
        id: 'merge-two-sorted-lists',
        title: 'Merge Two Sorted Lists',
        statement: 'You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.',
        difficulty: 'Easy',
        examples: [
          { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
          { input: 'list1 = [], list2 = [0]', output: '[0]' },
        ],
      },
      {
        id: 'linked-list-cycle',
        title: 'Linked List Cycle',
        statement: 'Given `head`, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer.',
        difficulty: 'Easy',
        examples: [
          { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
          { input: 'head = [1,2], pos = 0', output: 'true' },
        ],
      },
      {
        id: 'remove-nth-node-from-end',
        title: 'Remove Nth Node From End of List',
        statement: 'Given the `head` of a linked list, remove the `n`th node from the end of the list and return its head.',
        difficulty: 'Medium',
        examples: [
          { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
          { input: 'head = [1], n = 1', output: '[]' },
        ],
      },
    ],
  },
  {
    name: 'Stacks & Queues',
    problems: [
      {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        statement: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.',
        difficulty: 'Easy',
        examples: [
          { input: 's = "()"', output: 'true' },
          { input: 's = "()[]{}"', output: 'true' },
          { input: 's = "(]"', output: 'false' },
        ],
      },
      {
        id: 'min-stack',
        title: 'Min Stack',
        statement: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the `MinStack` class.',
        difficulty: 'Medium',
        examples: [
          { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: '[null,null,null,null,-3,null,0,-2]' },
        ],
      },
      {
        id: 'daily-temperatures',
        title: 'Daily Temperatures',
        statement: 'Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.',
        difficulty: 'Medium',
        examples: [
          { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
          { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
        ],
      },
    ],
  },
  {
    name: 'Trees',
    problems: [
        {
            id: 'max-depth-binary-tree',
            title: 'Maximum Depth of Binary Tree',
            statement: "Given the `root` of a binary tree, return its maximum depth.",
            difficulty: 'Easy',
            examples: [
                { input: "root = [3, 9, 20, null, null, 15, 7]", output: "3" },
                { input: "root = [1, null, 2]", output: "2" }
            ]
        },
        {
            id: 'invert-binary-tree',
            title: 'Invert Binary Tree',
            statement: 'Given the `root` of a binary tree, invert the tree, and return its root.',
            difficulty: 'Easy',
            examples: [
              { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
              { input: 'root = [2,1,3]', output: '[2,3,1]' },
            ],
        },
        {
            id: 'validate-binary-search-tree',
            title: 'Validate Binary Search Tree',
            statement: 'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node\'s key. The right subtree of a node contains only nodes with keys greater than the node\'s key. Both the left and right subtrees must also be binary search trees.',
            difficulty: 'Medium',
            examples: [
              { input: 'root = [2,1,3]', output: 'true' },
              { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' },
            ],
        },
        {
            id: 'level-order-traversal',
            title: 'Binary Tree Level Order Traversal',
            statement: 'Given the `root` of a binary tree, return the level order traversal of its nodes\' values. (i.e., from left to right, level by level).',
            difficulty: 'Medium',
            examples: [
              { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
              { input: 'root = [1]', output: '[[1]]' },
            ],
        },
    ]
  },
  {
    name: 'Heaps',
    problems: [
      {
        id: 'kth-largest-element',
        title: 'Kth Largest Element in an Array',
        statement: 'Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.',
        difficulty: 'Medium',
        examples: [
          { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
          { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
        ],
      },
      {
        id: 'top-k-frequent-elements',
        title: 'Top K Frequent Elements',
        statement: 'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
        difficulty: 'Medium',
        examples: [
          { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
          { input: 'nums = [1], k = 1', output: '[1]' },
        ],
      },
      {
        id: 'find-median-from-data-stream',
        title: 'Find Median from Data Stream',
        statement: 'The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the `MedianFinder` class.',
        difficulty: 'Hard',
        examples: [
          { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]', output: '[null,null,null,1.5,null,2.0]' },
        ],
      },
    ],
  },
  {
    name: 'Graphs',
    problems: [
      {
        id: 'number-of-islands',
        title: 'Number of Islands',
        statement: 'Given an `m x n` 2D binary grid `grid` which represents a map of `1`s (land) and `0`s (water), return the number of islands.',
        difficulty: 'Medium',
        examples: [
          { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
          { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
        ],
      },
      {
        id: 'clone-graph',
        title: 'Clone Graph',
        statement: 'Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.',
        difficulty: 'Medium',
        examples: [
          { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]', explanation: 'This is a representation of the graph connections, not a direct input/output.' },
        ],
      },
      {
        id: 'course-schedule',
        title: 'Course Schedule',
        statement: 'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return `true` if you can finish all courses. Otherwise, return `false`.',
        difficulty: 'Medium',
        examples: [
          { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'To take course 1 you have to finish course 0. So it is possible.' },
          { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'There is a cycle, so it is impossible.' },
        ],
      },
    ],
  },
  {
    name: 'Dynamic Programming',
    problems: [
      {
        id: 'climbing-stairs',
        title: 'Climbing Stairs',
        statement: 'You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        difficulty: 'Easy',
        examples: [
          { input: 'n = 2', output: '2', explanation: '1. 1 step + 1 step\n2. 2 steps' },
          { input: 'n = 3', output: '3', explanation: '1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step' },
        ],
      },
      {
        id: 'coin-change',
        title: 'Coin Change',
        statement: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
        difficulty: 'Medium',
        examples: [
          { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
          { input: 'coins = [2], amount = 3', output: '-1' },
        ],
      },
      {
        id: 'longest-increasing-subsequence',
        title: 'Longest Increasing Subsequence',
        statement: 'Given an integer array `nums`, return the length of the longest strictly increasing subsequence.',
        difficulty: 'Medium',
        examples: [
          { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,101], therefore the length is 4.' },
          { input: 'nums = [0,1,0,3,2,3]', output: '4' },
        ],
      },
      {
        id: 'house-robber',
        title: 'House Robber',
        statement: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.',
        difficulty: 'Medium',
        examples: [
          { input: 'nums = [1,2,3,1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4.' },
          { input: 'nums = [2,7,9,3,1]', output: '12', explanation: 'Rob house 1 (money = 2), rob house 3 (money = 9), and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12.' },
        ],
      },
    ],
  },
];

export const ALL_PROBLEMS: Problem[] = DSA_PROBLEMS.flatMap(category => category.problems);

export const LANGUAGE_OPTIONS = Object.values(Language);
export const MODE_OPTIONS = Object.values(Mode);

export const DEFAULT_CODE: Record<Language, string> = {
    [Language.Python]: `# Your Python code here\n\ndef solve():\n    pass`,
    [Language.JavaScript]: `// Your JavaScript code here\n\nfunction solve() {\n    \n}`,
    [Language.Java]: `// Your Java code here\n\nclass Solution {\n    public void solve() {\n        \n    }\n}`,
    [Language.CPP]: `// Your C++ code here\n\n#include <iostream>\n\nvoid solve() {\n    \n}`,
};