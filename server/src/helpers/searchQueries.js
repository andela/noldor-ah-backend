const buildQuery = (category, author, searchTerm) => {
  if (category && !author) {
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", "Articles".title, 
    "Articles".description,  "Articles".content, "Articles".slug, 
    "Articles"."featuredImg", "Articles"."category", "Articles"."ratings", "Articles"."createdAt", 
    "Articles"."updatedAt" FROM "Articles"
    INNER JOIN "Categories" ON "Articles"."category" = "Categories"."name"
    AND "Articles"."published" = 'TRUE' 
    WHERE "Categories"."name" = '${category}' 
    AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}') 
    ORDER BY "Articles"."createdAt" DESC`;
  }

  if (author && !category) { // filter by author only
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", "Articles".title, 
    "Articles".description,  "Articles".content, "Articles".slug, 
    "Articles"."featuredImg", "Articles"."createdAt", "Articles"."createdAt", 
    "Articles"."updatedAt" FROM "Articles" INNER JOIN "Users" ON 
    "Articles"."userId" = "Users"."id" AND "Articles".published = 'TRUE' 
    WHERE "Users"."username" = '${author}' 
    AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}') 
    ORDER BY "Articles"."createdAt" DESC`;
  }

  if (author && category) {
    return `SELECT DISTINCT "Articles".id, "Articles"."userId", "Articles".title,
     "Articles".description,  "Articles".content, "Articles".slug, 
     "Articles"."featuredImg", "Articles"."createdAt", "Articles"."createdAt", 
     "Articles"."updatedAt" FROM "Articles" INNER JOIN "Categories" ON 
     "Articles"."category" = "Categories"."name" INNER JOIN "Users" ON
     "Users"."id" = "Articles"."userId" WHERE "Categories"."name" = '${category}' 
     AND "Users"."username" = '${author}'
     AND "Articles"."searchVectors" @@ to_tsquery('${searchTerm}') 
     AND "Articles"."published" = 'TRUE'
     ORDER BY "Articles"."createdAt" DESC;
     `;
  }

  if (!author && !category) { // no filters
    return `SELECT "Articles".id, "Articles"."userId", "Articles".title, 
    "Articles".description,  "Articles".content, "Articles".slug, 
    "Articles"."featuredImg", "Articles"."createdAt", "Articles"."updatedAt" 
    FROM "Articles" INNER JOIN "Users" ON "Articles"."userId" = "Users"."id" 
    AND "Articles".published = 'TRUE' WHERE "Articles"."searchVectors" 
    @@ to_tsquery('${searchTerm}')ORDER BY "Articles"."createdAt" DESC`;
  }
};

export default buildQuery;
