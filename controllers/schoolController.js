import { pool } from "../config/db.js"
import { haversineDistanceKm } from "../utils/distance.js"
import { addSchoolSchema, coordsSchema } from "../validations/schoolValidations.js"

export const addSchool = async (req, res) => {
    try {
        const {error, value} = addSchoolSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const {name, address, latitude, longitude} = value
        const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`
        const [result] = await pool.execute(sql, [name, address, longitude, latitude])
        res.status(201).json({
            success: true,
            id: result.insertId,
            message: "School Added Successfully"
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

export const listSchools = async(req, res) => {
    try {
        const {error, value} = coordsSchema.validate({
            lat: req.query.lat !== undefined ? Number(req.query.lat) : undefined,
            lng: req.query.lng !== undefined ? Number(req.query.lng) : undefined,
            limit: req.query.limit !== undefined ? Number(req.query.limit) : undefined
        })
        if(error){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const { lat, lng, limit = 100 } = value;
        const [schools] = await pool.query(`SELECT * FROM schools`);
        const sorted = schools.map(s => ({
        ...s,
        distance_km: Number(haversineDistanceKm(lat, lng, s.latitude, s.longitude).toFixed(3))
        }))
        .sort((a, b) => a.distance_km - b.distance_km)
        .slice(0, limit);

        res.status(201).json({
            success: true,
            count: sorted.length, 
            schools: sorted
        });
    } catch (error) {
       res.status(501).json({
            success: false,
            message: error.message
        }) 
    }
}