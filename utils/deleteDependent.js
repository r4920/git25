/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter8694 = { 'updatedBy': { '$in': user } };
      const Blog8749 = await deleteBlog(BlogFilter8694);
      const BlogFilter0210 = { 'addedBy': { '$in': user } };
      const Blog3506 = await deleteBlog(BlogFilter0210);
      const userFilter4229 = { 'addedBy': { '$in': user } };
      const user1874 = await deleteUser(userFilter4229);
      const userFilter4395 = { 'updatedBy': { '$in': user } };
      const user2723 = await deleteUser(userFilter4395);
      const userTokensFilter9082 = { 'userId': { '$in': user } };
      const userTokens9741 = await deleteUserTokens(userTokensFilter9082);
      const userTokensFilter4493 = { 'addedBy': { '$in': user } };
      const userTokens6969 = await deleteUserTokens(userTokensFilter4493);
      const userTokensFilter1153 = { 'updatedBy': { '$in': user } };
      const userTokens3520 = await deleteUserTokens(userTokensFilter1153);
      const roleFilter8582 = { 'addedBy': { '$in': user } };
      const role5025 = await deleteRole(roleFilter8582);
      const roleFilter7779 = { 'updatedBy': { '$in': user } };
      const role0853 = await deleteRole(roleFilter7779);
      const projectRouteFilter2570 = { 'addedBy': { '$in': user } };
      const projectRoute3023 = await deleteProjectRoute(projectRouteFilter2570);
      const projectRouteFilter0829 = { 'updatedBy': { '$in': user } };
      const projectRoute9350 = await deleteProjectRoute(projectRouteFilter0829);
      const routeRoleFilter6987 = { 'addedBy': { '$in': user } };
      const routeRole7449 = await deleteRouteRole(routeRoleFilter6987);
      const routeRoleFilter3344 = { 'updatedBy': { '$in': user } };
      const routeRole7748 = await deleteRouteRole(routeRoleFilter3344);
      const userRoleFilter7525 = { 'userId': { '$in': user } };
      const userRole2834 = await deleteUserRole(userRoleFilter7525);
      const userRoleFilter3444 = { 'addedBy': { '$in': user } };
      const userRole0851 = await deleteUserRole(userRoleFilter3444);
      const userRoleFilter7258 = { 'updatedBy': { '$in': user } };
      const userRole2334 = await deleteUserRole(userRoleFilter7258);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter4900 = { 'roleId': { '$in': role } };
      const routeRole5082 = await deleteRouteRole(routeRoleFilter4900);
      const userRoleFilter9384 = { 'roleId': { '$in': role } };
      const userRole7489 = await deleteUserRole(userRoleFilter9384);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter3470 = { 'routeId': { '$in': projectroute } };
      const routeRole9220 = await deleteRouteRole(routeRoleFilter3470);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter5017 = { 'updatedBy': { '$in': user } };
      const Blog7951 = await softDeleteBlog(BlogFilter5017, updateBody);
      const BlogFilter2019 = { 'addedBy': { '$in': user } };
      const Blog8543 = await softDeleteBlog(BlogFilter2019, updateBody);
      const userFilter8791 = { 'addedBy': { '$in': user } };
      const user9811 = await softDeleteUser(userFilter8791, updateBody);
      const userFilter1059 = { 'updatedBy': { '$in': user } };
      const user7862 = await softDeleteUser(userFilter1059, updateBody);
      const userTokensFilter9733 = { 'userId': { '$in': user } };
      const userTokens8953 = await softDeleteUserTokens(userTokensFilter9733, updateBody);
      const userTokensFilter3642 = { 'addedBy': { '$in': user } };
      const userTokens5607 = await softDeleteUserTokens(userTokensFilter3642, updateBody);
      const userTokensFilter4920 = { 'updatedBy': { '$in': user } };
      const userTokens3301 = await softDeleteUserTokens(userTokensFilter4920, updateBody);
      const roleFilter9040 = { 'addedBy': { '$in': user } };
      const role6748 = await softDeleteRole(roleFilter9040, updateBody);
      const roleFilter2690 = { 'updatedBy': { '$in': user } };
      const role6327 = await softDeleteRole(roleFilter2690, updateBody);
      const projectRouteFilter7920 = { 'addedBy': { '$in': user } };
      const projectRoute4803 = await softDeleteProjectRoute(projectRouteFilter7920, updateBody);
      const projectRouteFilter0673 = { 'updatedBy': { '$in': user } };
      const projectRoute2258 = await softDeleteProjectRoute(projectRouteFilter0673, updateBody);
      const routeRoleFilter4436 = { 'addedBy': { '$in': user } };
      const routeRole0819 = await softDeleteRouteRole(routeRoleFilter4436, updateBody);
      const routeRoleFilter9319 = { 'updatedBy': { '$in': user } };
      const routeRole5643 = await softDeleteRouteRole(routeRoleFilter9319, updateBody);
      const userRoleFilter7756 = { 'userId': { '$in': user } };
      const userRole5868 = await softDeleteUserRole(userRoleFilter7756, updateBody);
      const userRoleFilter5745 = { 'addedBy': { '$in': user } };
      const userRole4942 = await softDeleteUserRole(userRoleFilter5745, updateBody);
      const userRoleFilter2339 = { 'updatedBy': { '$in': user } };
      const userRole1393 = await softDeleteUserRole(userRoleFilter2339, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter4235 = { 'roleId': { '$in': role } };
      const routeRole3719 = await softDeleteRouteRole(routeRoleFilter4235, updateBody);
      const userRoleFilter0653 = { 'roleId': { '$in': role } };
      const userRole3308 = await softDeleteUserRole(userRoleFilter0653, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter9681 = { 'routeId': { '$in': projectroute } };
      const routeRole3567 = await softDeleteRouteRole(routeRoleFilter9681, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
