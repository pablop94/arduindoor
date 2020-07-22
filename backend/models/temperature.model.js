module.exports = mongoose => {
    
var Schema = mongoose.Schema;

var temperatureSchema =  new Schema(
    {
    topic: String,
    dateTime: String,
    value: String
    },
    { timestamps: true },
    {
      collection: 'temperatures'
    }
);

temperatureSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Temperature = mongoose.model("Temperature", temperatureSchema);

return Temperature;
};