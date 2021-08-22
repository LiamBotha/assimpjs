var fs = require ('fs');
var path = require ('path');
var assert = require ('assert');

var config = 'Debug'
if (process.env.TEST_CONFIG !== undefined) {
	config = process.env.TEST_CONFIG;
}
var assimpjs = require ('../em_build/' + config + '/assimpjs.js')();

var ajs = null;
before (async function () {
	if (ajs !== null) {
		return;
	}
	ajs = await assimpjs;
});

function LoadModel (files)
{
	let fileList = new ajs.FileList ();
	for (let i = 0; i < files.length; i++) {
		let filePath = path.join (__dirname, '../assimp/test/models/' + files[i]);
		fileList.AddFile (filePath, fs.readFileSync (filePath))
	}
	return ajs.ImportModel (fileList);
}

function IsError (files)
{
	return LoadModel (files) === "error";
}

function IsSuccess (files)
{
	return LoadModel (files) !== "error";
}

describe ('Importer', function () {

it ('Empty file list', function () {
	assert (IsError ([]));
});

it ('Not importable file', function () {
	assert (IsError (['3DS/test.png']));
});

it ('Independent order', function () {
	assert (IsSuccess (['OBJ/cube_usemtl.obj', 'OBJ/cube_usemtl.mtl']));
	assert (IsSuccess (['OBJ/cube_usemtl.mtl', 'OBJ/cube_usemtl.obj']));
});

it ('3D', function () {
	assert (IsSuccess (['3D/box.uc', '3D/box_a.3d', '3D/box_d.3d']));
});

it ('3DS', function () {
	assert (IsSuccess (['3DS/test1.3ds']));
	assert (IsSuccess (['3DS/fels.3ds']));
	assert (IsSuccess (['3DS/cubes_with_alpha.3DS']));
	assert (IsSuccess (['3DS/cube_with_specular_texture.3DS']));
	assert (IsSuccess (['3DS/cube_with_diffuse_texture.3DS']));
});

it ('3MF', function () {
	assert (IsSuccess (['3MF/box.3mf']));
});

it ('AC', function () {
	assert (IsSuccess (['AC/SphereWithLight.ac']));
});

it ('AMF', function () {
	assert (IsSuccess (['AMF/test_with_mat.amf']));
});

it ('ASE', function () {
	assert (IsSuccess (['ASE/ThreeCubesGreen.ASE']));
});

it ('B3D', function () {
	assert (IsSuccess (['B3D/WusonBlitz.b3d']));
});

it ('BLEND', function () {
	// TODO
	assert (IsError (['BLEND/box.blend']));
});

it ('BVH', function () {
	assert (IsSuccess (['BVH/Boxing_Toes.bvh']));
});

it ('COB', function () {
	assert (IsSuccess (['COB/molecule.cob']));
});

it ('COLLADA', function () {
	assert (IsSuccess (['COLLADA/duck.dae']));
	assert (IsSuccess (['COLLADA/duck.zae']));
});

it ('CSM', function () {
	assert (IsSuccess (['CSM/ThomasFechten.csm']));
});

it ('DXF', function () {
	// TODO
	assert (IsError (['DXF/PinkEggFromLW.dxf']));
});

it ('FBX', function () {
	assert (IsSuccess (['FBX/cubes_with_names.fbx']));
});

it ('glTF', function () {
	// TODO
	assert (IsError (['glTF/BoxTextured-glTF-Binary/BoxTextured.glb']));
});

it ('glTF2', function () {
	// TODO
	assert (IsError (['glTF2/BoxTextured-glTF-Binary/BoxTextured.glb']));
});

it ('HMP', function () {
	assert (IsSuccess (['HMP/terrain.hmp']));
});

it ('IFC', function () {
	assert (IsSuccess (['IFC/AC14-FZK-Haus.ifc']));
});

it ('IRR', function () {
	// TODO
	assert (IsError (['IRR/box.irr']));
});

it ('IRRMesh', function () {
	// TODO
	assert (IsError (['IRRMesh/spider.irrmesh']));
});

it ('JT', function () {
	// TODO
	assert (IsError (['JT/conrod.jt']));
});

it ('LWO', function () {
	// TODO
	assert (IsSuccess (['LWO/LWO2/sphere_with_mat_gloss_10pc.lwo']));
	assert (IsError (['LWO/LWOB/sphere_with_mat_gloss_10pc.lwo']));
	assert (IsSuccess (['LWO/LXOB_Modo/sphereWithVertMap.lxo']));
});

it ('LWS', function () {
	assert (IsSuccess (['LWS/simple_cube.lwo']));
});

it ('M3D', function () {
	assert (IsSuccess (['M3D/cube_usemtl.m3d']));
});

it ('MD2', function () {
	assert (IsSuccess (['MD2/sydney.md2']));
});

it ('MD5', function () {
	assert (IsSuccess (['MD5/SimpleCube.md5mesh']));
});

it ('MDC', function () {
	assert (IsSuccess (['MDC/spider.mdc']));
});

it ('MDL', function () {
	// TODO
	assert (IsError (['MDL/MDL (HL1)/man.mdl']));
	assert (IsSuccess (['MDL/MDL3 (3DGS A4)/minigun.MDL']));
	assert (IsSuccess (['MDL/MDL5 (3DGS A5)/minigun_mdl5.mdl']));
	assert (IsSuccess (['MDL/MDL7 (3DGS A7)/Sphere_DiffPinkBlueSpec_Alpha90.mdl']));
});

it ('MS3D', function () {
	assert (IsSuccess (['MS3D/twospheres_withmats.ms3d']));
});

it ('NFF', function () {
	assert (IsSuccess (['NFF/NFF/spheres.nff']));
});

it ('OBJ', function () {
	assert (IsSuccess (['OBJ/spider.obj']));
	assert (IsSuccess (['OBJ/cube_usemtl.obj', 'OBJ/cube_usemtl.mtl']));
});

it ('Speed', function () {
	assert (IsSuccess (['OBJ/cube_usemtl.obj', 'OBJ/cube_usemtl.mtl']));
	assert (IsSuccess (['OBJ/cube_usemtl.mtl', 'OBJ/cube_usemtl.obj']));
	assert (IsSuccess (['OBJ/spider.obj']));
	assert (IsSuccess (['OBJ/cube_usemtl.obj', 'OBJ/cube_usemtl.mtl']));
	assert (IsSuccess (['3DS/test1.3ds']));
	assert (IsSuccess (['3DS/fels.3ds']));
	assert (IsSuccess (['3DS/cubes_with_alpha.3DS']));
	assert (IsSuccess (['3DS/cube_with_specular_texture.3DS']));
	assert (IsSuccess (['3DS/cube_with_diffuse_texture.3DS']));
});

});