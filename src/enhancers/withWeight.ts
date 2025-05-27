import { compose, map, multiply } from 'ramda';
import { ScoreAlgorithm, ScoreMap, Transformer } from '../types';

// const sumAbsoluteValues = compose(sum, map(Math.abs), map(sum), values);

function getWeightTransformer(weight: number) {
  let computeWeightedScore: Transformer<ScoreMap> = (scoreMap) => {
    const transformScores: Transformer<number[]> = map(multiply(weight));
    return map(transformScores, scoreMap);
  };
  return computeWeightedScore;
}

/**
 * Apply given weight to a ScoreMap result algorithm
 * To be efficient, scores returned by the algorithm should be bounded in the same range
 * For example, you can use `withPercentages` or `withStrictBound` on your algorithm to restrict scores between -1 and 1
 */
const withWeight = <T, C extends {} = {}>(weight: number, fn: ScoreAlgorithm<T, C>): ScoreAlgorithm<T, C> => compose(getWeightTransformer(weight), fn);

export default withWeight;
