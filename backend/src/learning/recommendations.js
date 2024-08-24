const tf = require('@tensorflow/tfjs');

function collaborativeFiltering(userInteractions, numUsers, numItems) {
    const userMatrix = tf.tensor2d(userInteractions, [numUsers, numItems]);
    const itemMatrix = tf.variable(tf.randomNormal([numItems, numItems]));

    const predictions = tf.matMul(userMatrix, itemMatrix);
    return predictions;
}

module.exports = { collaborativeFiltering };
