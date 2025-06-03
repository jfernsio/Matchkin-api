import {Request, Response} from 'express';

import User from '../models/userModel';

const clientProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const { companyName, industry, companyDescription, projectsPosted } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!companyName || !industry || !projectsPosted) {
            return res.status(400).json({ message: 'Company name, industry, and projects posted are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userProfile = {
            user: userId,
            companyName,
            industry,
            companyDescription,
            projectsPosted
        }
        const savedProfile = await User.findByIdAndUpdate(userId, userProfile, { new: true });
        if (!savedProfile) {
            return res.status(500).json({ message: 'Error in creating clientProfile' });
        }
        console.log('Client profile created successfully:', savedProfile);
        

        res.status(201).json({ message: 'Client profile created successfully', profile: savedProfile });
    
        const updatedUser = await User.findById(userId);
        if (updatedUser) {
            res.status(200).json({ message: 'User profile retrieved successfully', user: updatedUser });
        }
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const consultantProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        console.log("userId",userId)
        const { skills, fullName, domain, availabilityTimeline , yearsOfExperience , bio} = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        if (!skills || !fullName || !domain || !availabilityTimeline || !yearsOfExperience) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const userProfile = {
            user: userId,
            skills,
            fullName,
            domain,
            availabilityTimeline,
            yearsOfExperience,
            bio
        }
        const savedProfile = await User.findByIdAndUpdate(userId, userProfile, { new: true });
        if (!savedProfile) {
            return res.status(500).json({ message: 'Error in creating consultantProfile' });
        }
        console.log('Consultant profile created successfully:', savedProfile);
        

        res.status(201).json({ message: 'Consultant profile created successfully', profile: savedProfile });
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export {clientProfile, consultantProfile};