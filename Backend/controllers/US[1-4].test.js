const { deleteCar } = require('./jestcars');
const Booking = require('../models/Bookings');

// Mock dependencies
jest.mock('../models/Car', () => ({
    findById: jest.fn(),
}));

describe('deleteCar function', () => {
    it('should delete a car when it has not been booked by the user', async () => {
        const req = {
            params: { id: '662fc344c9c959d5144ad3e2' }, //testjest1 car
            user: { id: '662f74ab8f787a82d38e9a0b', role: 'provider' } // User making the request
        };
        const res = {
            status: jest.fn().mockReturnThis(), // Mock the status method
            json: jest.fn() // Mock the json method
        };
    
        // Mock Car.findById to resolve with a mock car
        const mockCar = { provider: '662f74ab8f787a82d38e9a0b', deleteOne: jest.fn() };
        require('../models/Car').findById.mockResolvedValue(mockCar);

        // Mock Booking.find to resolve with an empty array, indicating the car is not booked
        const mockBooking = [];
        jest.spyOn(Booking, 'find').mockResolvedValue(mockBooking);
    
        // Call deleteCar function
        await deleteCar(req, res);
    
        // Expectations
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ 
          success: true, 
          message: 'Car deleted successfully' });

        // Add some debugging information
        console.log('res.status was called with:', res.status.mock.calls[0][0]);
        console.log('res.json was called with:', res.json.mock.calls[0][0]);
  });

    it('should not delete a car when it has been booked by the user', async () => {
      const req = {
        params: { id: '663099460f535115488837fa' }, //testjest2
        user: { id: '662f74ab8f787a82d38e9a0b', role: 'provider' } // User making the request
      };
      const res = {
        status: jest.fn().mockReturnThis(), // Mock the status method
        json: jest.fn() // Mock the json method
      };
  
      // Mock Car.findById to resolve with a mock car
      const mockCar = { provider: '662f74ab8f787a82d38e9a0b', deleteOne: jest.fn() };
      require('../models/Car').findById.mockResolvedValue(mockCar);
  
      // Mock Booking.find to resolve with an empty array, indicating the car is not booked
      const mockBooking = [{
        id: '663099a5ffc272f92270633d',
      }]
      jest.spyOn(Booking, 'find').mockResolvedValue(mockBooking);
  
      // Call deleteCar function
      await deleteCar(req, res);
  
      // Expectations
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: `This car is still booking`
      });
  
      // Add some debugging information
      console.log('res.status was called with:', res.status.mock.calls[0][0]);
      console.log('res.json was called with:', res.json.mock.calls[0][0]);
    });
    
    it('should not delete a car that does not exist', async () => {
      const req = {
          params: { },
          user: { id: '662f74ab8f787a82d38e9a0b', role: 'provider' } // User making the request
      };
      const res = {
          status: jest.fn().mockReturnThis(), // Mock the status method
          json: jest.fn() // Mock the json method
      };
  
      // Mock Car.findById to resolve with a mock car
      const mockCar = null; // No car found
      require('../models/Car').findById.mockResolvedValue(mockCar);
  
      // Call deleteCar function
      await deleteCar(req, res);
  
      // Expectations
      expect(res.status).toHaveBeenCalledWith(404); // Status 404 expected
      expect(res.json).toHaveBeenCalledWith({
          success: false,
          message: `Car not found`
      });
  
      // Add some debugging information
      console.log('res.status was called with:', res.status.mock.calls[0][0]);
      console.log('res.json was called with:', res.json.mock.calls[0][0]);
  });
  
});