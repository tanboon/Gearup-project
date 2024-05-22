const { createCar } = require('./jestcars');
const Car = require('../models/Car');
const mongoose = require('mongoose');

describe('createCar function', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return an error when brand is not filled in', async () => {
        const req = {
            body: {
                Brand: '',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                FeePerDay: 60000,
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Car validation failed: Brand: Please specify a brand name'
        });
    });

    it('should return an error when model is not filled in', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: '',
                Year: '1970',
                Color: 'Black',
                FeePerDay: 60000,
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Car validation failed: Model: Please specify a car model'
        });
    });

    it('should return an error when year is not filled in', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '',
                Color: 'Black',
                FeePerDay: 60000,
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Car validation failed: Year: Please specify a year",
        });
    });

    it('should return an error when color is not filled in', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: '',
                FeePerDay: 60000,
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Car validation failed: Color: Please specify a color",
        });
    });

    it('should return an error when feeperday is not filled in', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                //FeePerDay: "",
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Car validation failed: FeePerDay: Please specify a fee per day",
        });
    });

    it('should return an error when feeperday is filled with wrong requirement', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                FeePerDay: "abc",
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Car validation failed: FeePerDay: Cast to Number failed for value \"abc\" (type string) at path \"FeePerDay\"",
        });
    });

    it('should return an error when picture is not uploaded', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                FeePerDay: "60000",
                PictureCover: '',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test-9999',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Car validation failed: PictureCover: Please specify a cover picture",
        });
    });

    it('should return an error when license plate number is not filled in', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                FeePerDay: "60000",
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: '',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Car validation failed: LicensePlate: Please specify a license plate number'
        });
    });

    // it('should return an error when license plate number is duplicated', async () => {
    //     const req = {
    //         body: {
    //             Brand: 'Dodge',
    //             Model: 'Charger R/T',
    //             Year: '1970',
    //             Color: 'Black',
    //             FeePerDay: "60000",
    //             PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
    //             LicensePlate: '5 TT 4567',
    //         },
    //         user: {
    //             id: '662f74ab8f787a82d38e9a0b',
    //             role: 'provider'
    //         }
    //     };

    //     const res = {
    //         status: jest.fn(() => res),
    //         json: jest.fn()
    //     };

    //     await createCar(req, res);

    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalledWith({
    //         success: false,
    //         message: 'E11000 duplicate key error collection: test.cars index: LicensePlate_1 dup key: { LicensePlate: \"5 TT 4567\" }'
    //     });
    // });

    it('should create a car when all fields are filled in correctly', async () => {
        const req = {
            body: {
                Brand: 'Dodge',
                Model: 'Charger R/T',
                Year: '1970',
                Color: 'Black',
                FeePerDay: "60000",
                PictureCover: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture1: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture2: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture3: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                Picture4: 'https://drive.google.com/uc?export=view&amp;id=1L9pS0Zmm3zbvZXElP8aE6sNirMFpLld9',
                LicensePlate: 'test 6666',
            },
            user: {
                id: '662f74ab8f787a82d38e9a0b',
                role: 'provider'
            }
        };

        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        const createdCar = {
            Brand: req.body.Brand,
            Model: req.body.Model,
            Year: req.body.Year,
            Color: req.body.Color,
            FeePerDay: req.body.FeePerDay,
            LicensePlate: req.body.LicensePlate,
            provider: req.user.id,
            PictureCover: req.body.PictureCover,
            //_id: mongoose.Types.ObjectId(),
        };
        Car.create = jest.fn().mockResolvedValue(createdCar);

        await createCar(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: createdCar
        });
    });

});
