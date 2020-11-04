const UserModel = require(`${__basedir}/models/user`);

const getAll = async()=>{
    return UserModel.find({})
}

const getOne = async(id)=>{
    return UserModel.findOne({_id:id});
}

const getOneByName = async(name)=>{
    return UserModel.findOne({'facebook.name':name});
}

const getOneByFacebookId = async(facebookId) => {
    return UserModel.findOne({'facebook.id':{$eq:facebookId}});
}

const create = async(data)=>{
    const user = new UserModel(data);
    return user.save();
}

const update = async(id,data)=>{
    const user = await getOne(id);

    if(!user) {
        throw new Error(`Couldn't find data for updating`);
    }

    Object.keys(data).forEach((key)=>{
        user[key] = data[key];
    });
    return user.save();
}

const remove = async(query)=>{
    const result = await UserModel.remove(query);

    return result.n;
}

module.exports = {
    getAll,
    getOne,
    getOneByName,
    getOneByFacebookId,
    create,
    update,
    remove
}