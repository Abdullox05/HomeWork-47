const Service_Validation = require("../validations/service_validation");
const query = require("./queries");

const create_service = async (req,res) => {
  try {
    const {title, description, price} = req.body;

    const error = await Service_Validation({title, description, price});

    if (error) return res.status(400).json({message: error.message});

    const services = await query.getServices();

    const check = services.find((service) => service.title === title);
        
    if (check) return res.status(403).json({message: "This Title has already been used"});

    const owner_id = req.user;

    const data = await query.createService(title, description, price,owner_id);
        
    res.status(201).json({message: "Successfully created", data: data})
  } catch (error) {
    res.status(500).json({message: "INTERNAL SERVER ERROR"})
  }
};

const get_services = async (req,res) => {
    try {
        const services = await query.getServices();
    
        res.json({message: "Successfully shown", data: services});
    } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
    }
}

const get_service = async (req,res) => {
    try {
        const {id} = req.params;

        const service = await query.getService(id);
    
        if (!service) return res.status(404).json({message:"Service not found"});

        res.json({message: "Successfully shown", data: service});
      } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
      }
}

const change_service = async (req,res) => {
    try {
        const {id} = req.params;

        let service = await query.getService(id);
    
        if (!service) return res.status(404).json({message:"Service not found"});

        const user_id = req.user;

        if (user_id !== service.owner_id) return res.status(403).json({message:"You are not the Owner of this service"});

        const {title = service.title, description = service.description, price = service.price} = req.body;

        const error = await Service_Validation({title, description, price});

        if (error) return res.status(400).json({message:error.message});

        service.title = title;

        service.description = description;

        service.price = price;

        const data = await query.changeService(title, description, price);

        res.json({message: "Successfully changed", data: service});
      } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
      }
}

const delete_service = async (req,res) => {
    try {
        const {id} = req.params;
    
        const service = await query.getService(id);
    
        if (!service) return res.status(404).json({message:"Service not found"});

        const user_id = req.user;

        if (user_id !== service.owner_id) return res.status(403).json({message:"You are not the Owner of this service"});

        await query.deleteService(id);

        res.json({message: "Successfully deleted", data: service});
      } catch (error) {
        res.status(500).json({message: "INTERNAL SERVER ERROR"});
      }
}

module.exports = {create_service, get_services, get_service, change_service, delete_service};
