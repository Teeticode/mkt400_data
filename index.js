const express = require("express");
const filteredJson = require("./filtered.json");
const app = express();

app.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

  if (filteredJson && Array.isArray(filteredJson)) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = filteredJson.slice(startIndex, endIndex);

    return res.status(200).json({
      data: paginatedData,
      page: page,
      itemsPerPage: itemsPerPage,
      totalItems: filteredJson.length,
      totalPages: Math.ceil(filteredJson.length / itemsPerPage),
    });
  } else {
    return res
      .status(500)
      .json({ error: "Data is not in the expected format" });
  }
});

app.listen(4000, () => {
  console.log("listening to port 4000");
});
