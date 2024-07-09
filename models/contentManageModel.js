const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactDetailsSchema = new Schema(
    {
        status: {
            type: String,
            required: true,
            enum: ['enabled', 'disabled']
        },
        contact: {
            status: {
                type: String,
                required: true,
                enum: ['enabled', 'disabled']
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
        },
        email: {
            status: {
                type: String,
                required: true,
                enum: ['enabled', 'disabled']
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
        },
        address: {
            status: {
                type: String,
                required: true,
                enum: ['enabled', 'disabled']
            },
            value: {
                type: String,
                required: true,
                trim: true
            },
        },
    });

const FeatureSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        trim: true
    },
    stopHere: {
        type: Boolean,
        required: true
    },
    process: {
        type: String,
        required: true,
        trim: true
    },
    failCount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['enabled', 'disabled']
    }
});

const PageSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['enabled', 'disabled']
    }
}, {
    timestamps: true
});

const FaqSchema = new Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    }
});

const FaqCategorySchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ['enabled', 'disabled']
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    faqs: [FaqSchema]
});

const ReviewSchema = new Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['enabled', 'disabled']
    }
});

const ContentManageSchema = new Schema({
    contents: {
        contactDetails: contactDetailsSchema,
    },
    features: [FeatureSchema],
    pages: [PageSchema],
    faqs: [FaqCategorySchema],
    reviews: [ReviewSchema]
}, {
    timestamps: true
});

const ContentManage = mongoose.model('ContentManage', ContentManageSchema);

module.exports = ContentManage;
