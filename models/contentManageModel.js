const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactDetailsSchema = new Schema(
    {
        status: {
            type: Boolean,
            dafault: false
        },
        contact: {
            status: {
                type: Boolean,
                dafault: false
            },
            value: {
                type: String,
                default: '',
                trim: true
            },
        },
        email: {
            status: {
                type: Boolean,
                dafault: false
            },
            value: {
                type: String,
                default: '',
                trim: true
            },
        },
        address: {
            status: {
                type: Boolean,
                dafault: false
            },
            value: {
                type: String,
                default: '',
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
        type: Boolean,
        required: true,
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
        type: Boolean,
        required: true,
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
        type: Boolean,
        required: true,
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
    profile: {
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
    title: {
        type: String,
        required: true,
        trim: true
    },
    review: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true
});

const ContentManageSchema = new Schema({
    contents: {
        contactDetails: contactDetailsSchema,
    },
    features: [FeatureSchema],
    pages: [PageSchema],
    faqCategories: [FaqCategorySchema],
    reviews: [ReviewSchema]
}, {
    timestamps: true
});

const ContentManage = mongoose.model('ContentManage', ContentManageSchema);

module.exports = ContentManage;
