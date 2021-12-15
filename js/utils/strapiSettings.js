//get strapi settings
export default function getStrapiSettings(bodyData, method, headers) {
    const settings = {
        method: method,
        body: bodyData,
        headers: headers
    };
    return settings;
};