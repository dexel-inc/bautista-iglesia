import service from '@/domain/services/service';
import {API_URL} from "@/config/config.ts";
import {testimonies} from "@/data/testimonials.ts";
import missionaries from "@/components/organism/aboutUs/Missionaries.tsx";

async function indexMissionaries() {
    if(!API_URL) {
        return missionaries;
    }

    try {
        const response = await service.get(`/api/missionaries`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

async function indexTestimonies() {
    if(!API_URL) {
        return testimonies;
    }

    try {
        const response = await service.get(`/api/testimonies`);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default {
    indexMissionaries,
    indexTestimonies
};