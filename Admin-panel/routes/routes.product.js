const express = require("express");

const proRoutes = express.Router();
const product = require("../model/model.product");

const middle = require("../middleware/private");

proRoutes.get("/form", middle, (req, res) => {
    res.render("form");
});

proRoutes.get("/editData/:id", async (req, res) => {
    let { id } = req.params;
    const data = await product.findById(id);
    if (!data) {
        return res.status(404).json({ msg: "Product not found" });
    }
    console.log(data)
    res.render("editData", { data });
});

proRoutes.patch("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { proName, price, rating, category, quantity, description } = req.body;

        let updatedProduct = await product.findByIdAndUpdate(id, { proName, price, rating, category, quantity, description });
        if (!updatedProduct) {
            return res.status(404).json({ msg: "product not found" });
        }

        res.status(200).json({ msg: "product updated successfully", updatedProduct });

    } catch (error) {
        res.status(400).json({ msg: "something went wrong", error: error.message })
    }
});

proRoutes.post("/formData", async (req, res) => {
    const { proName, price, rating, category, quantity, description } = req.body;

    let newUser = new product({ proName, price, rating, category, quantity, description });
    await newUser.save();
});



proRoutes.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    const deleteData = await product.findByIdAndDelete(id);
    console.log(deleteData);

});

proRoutes.post("/logout", (req, res) => {
    res.clearCookie('authtoken');
    res.status(200).json({ msg: "logout successfully" });
});

proRoutes.get("/getData", async (req, res) => {
    try {
        const data = await product.find();
        console.log(data);

        res.render("home", { data });

    } catch (error) {
        res.status(400).json({ msg: "data not found" });
    }
});

module.exports = proRoutes;