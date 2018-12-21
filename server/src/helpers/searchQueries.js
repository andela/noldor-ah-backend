const buildQuery = (tags, author, searchTerm) => {
  if (tags && !author) { // filter by tags only
    const tagsArray = tags.split(',').map(tag => `'${tag}' `);
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", 
    "Articles".title, "Articles".description,  "Articles".content, 
    "Articles".slug, "Articles"."featuredImg", "Articles"."createdAt", 
    "Articles"."createdAt", "Articles"."updatedAt" FROM "Articles" 
    INNER JOIN "ArticleTags" ON "ArticleTags"."articleId" = "Articles"."id" 
    INNER JOIN "Tags" ON "Tags"."id" = "ArticleTags"."tagId" 
    WHERE "Articles".published = 'TRUE' AND "Tags"."name" IN (${[...tagsArray]}) 
    AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}')
    ORDER BY "Articles"."createdAt" DESC`;
  }

  if (author && !tags) { // filter by author only
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", "Articles".title, 
    "Articles".description,  "Articles".content, "Articles".slug, 
    "Articles"."featuredImg", "Articles"."createdAt", "Articles"."createdAt", 
    "Articles"."updatedAt" FROM "Articles" INNER JOIN "Users" ON 
    "Articles"."userId" = "Users"."id" AND "Articles".published = 'TRUE' 
    WHERE "Users"."username" = '${author}' 
    AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}') 
    ORDER BY "Articles"."createdAt" DESC`;
  }

  if (author && tags) { // filter by both tags and author
    const tagsArray = tags.split(',').map(tag => `'${tag}' `);
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", "Articles".title,
     "Articles".description,  "Articles".content, "Articles".slug, 
     "Articles"."featuredImg", "Articles"."createdAt", "Articles"."createdAt", 
     "Articles"."updatedAt" FROM "Articles" INNER JOIN "ArticleTags" ON 
     "ArticleTags"."articleId" = "Articles"."id" INNER JOIN "Tags" ON 
     "Tags"."id" = "ArticleTags"."tagId" INNER JOIN "Users" ON 
     "Users"."id" = "Articles"."userId" WHERE "Tags"."name" IN (${[...tagsArray]}) 
     AND "Users"."username" = '${author}' AND "Articles"."searchVectors" 
     @@ to_tsquery('${searchTerm}') ORDER BY "Articles"."createdAt" DESC`;
  }

  if (!author && !tags) { // no filters
    return `SELECT "Articles".id, "Articles"."userId", "Articles".title, 
    "Articles".description,  "Articles".content, "Articles".slug, 
    "Articles"."featuredImg", "Articles"."createdAt", "Articles"."updatedAt" 
    FROM "Articles" INNER JOIN "Users" ON "Articles"."userId" = "Users"."id" 
    AND "Articles".published = 'TRUE' WHERE "Articles"."searchVectors" 
    @@ to_tsquery('${searchTerm}')ORDER BY "Articles"."createdAt" DESC`;
  }
};

export default buildQuery;
