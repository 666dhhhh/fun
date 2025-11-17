
import { Question } from './types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 1,
    key: 'gender',
    text: '你的性别是',
    type: 'radio',
    options: ['男', '女'],
  },
  {
    id: 2,
    key: 'isSmart',
    text: '你认为你聪明吗？',
    type: 'radio',
    options: ['是', '否'],
  },
  {
    id: 3,
    key: 'isGoodLooking',
    text: '你认为你好看吗？',
    type: 'radio',
    options: ['是', '否'],
  },
  {
    id: 4,
    key: 'hasCrush',
    text: '你现在有喜欢的人吗？',
    type: 'radio',
    options: ['是', '否'],
  },
  {
    id: 5,
    key: 'personality',
    text: '你认为你是一个什么样的人？',
    type: 'radio',
    options: ['乐观', '悲观', '中立'],
  },
];

export const CRUSH_INITIALS_QUESTION: Question = {
  id: 4.5,
  key: 'crushInitials',
  text: '请输入你喜欢的人的首字母缩写',
  type: 'text',
};
