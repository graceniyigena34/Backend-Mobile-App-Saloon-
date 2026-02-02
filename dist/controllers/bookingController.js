"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getBookings = exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.default.create(Object.assign(Object.assign({}, req.body), { customer: req.user.id }));
        yield booking.populate(['customer', 'service']);
        res.status(201).json(booking);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createBooking = createBooking;
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.user.role === 'customer' ? { customer: req.user.id } : {};
        const bookings = yield booking_1.default.find(filter).populate(['customer', 'service']);
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getBookings = getBookings;
const updateBookingStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield booking_1.default.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).populate(['customer', 'service']);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateBookingStatus = updateBookingStatus;
