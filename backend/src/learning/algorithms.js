const tf = require('@tensorflow/tfjs');

function adaptiveLearningModel(data) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [data.inputShape] }));
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dense({ units: data.outputShape, activation: 'softmax' }));
    
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
    });
    
    model.fit(data.inputs, data.labels, { epochs: 10 });
    
    return model;
}

module.exports = { adaptiveLearningModel };
