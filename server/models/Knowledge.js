const mongoose = require("mongoose");

const knowledgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      enum: ["note", "link", "insight"],
      default: "note",
      required: true,
    },

    sourceUrl: {
      type: String,
      trim: true,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    aiTags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    views: {
      type: Number,
      default: 0,
    },

    aiProcessed: {
      type: Boolean,
      default: false,
    },

    isPublic: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for better performance
knowledgeSchema.index({
  title: "text",
  content: "text",
  tags: "text",
  aiTags: "text",
});
knowledgeSchema.index({ type: 1, createdAt: -1 });
knowledgeSchema.index({ tags: 1 });
knowledgeSchema.index({ aiProcessed: 1 });

// Update timestamp on save
knowledgeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();

  // Auto-generate short summary if not provided
  if (!this.summary && this.content) {
    this.summary = this.content.substring(0, 150) + "...";
  }

  next();
});

// Instance methods
knowledgeSchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

knowledgeSchema.methods.addTag = async function (tag) {
  const normalizedTag = tag.toLowerCase().trim();
  if (!this.tags.includes(normalizedTag)) {
    this.tags.push(normalizedTag);
    return this.save();
  }
  return this;
};

knowledgeSchema.methods.addAITag = async function (tag) {
  const normalizedTag = tag.toLowerCase().trim();
  if (!this.aiTags.includes(normalizedTag)) {
    this.aiTags.push(normalizedTag);
    return this.save();
  }
  return this;
};

const Knowledge = mongoose.model("Knowledge", knowledgeSchema);
module.exports = Knowledge;
