import { SectionItem } from '../types';
import { PART1_SECTIONS } from './sections/part1_sec4_to_8';
import { PART2_SECTIONS } from './sections/part2_sec9_to_14';
import { PART3_SECTIONS } from './sections/part3_sec15_to_18';
import { PART4_SECTIONS } from './sections/part4_sec19_to_23';

export const SECTIONS_DATA: SectionItem[] = [
  ...PART1_SECTIONS,
  ...PART2_SECTIONS,
  ...PART3_SECTIONS,
  ...PART4_SECTIONS
];
