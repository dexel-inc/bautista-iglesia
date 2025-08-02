import service from '@/domain/services/service';

async function storeVisit(data: object) {
    try {
        const response = await service.post(`/api/visits`, data);
        return response.data.status.status === 'OK' ? response.data.data : null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export default {
    storeVisit,
};