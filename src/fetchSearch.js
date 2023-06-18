export default async function fetchSearch({ queryKey }) {
    const { animal, location, breed } = queryKey[1];
    const apires = await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    if (!apires.ok) {
        throw new Error(`details/${animal}, ${location}, ${breed} fetch not ok`);
    }

    // why we dont need to use await here?
    // because we are returning the promise
    // and react-query will handle the promise
    // so in case of promise returning we don't need to use await?
    // ANSWER: yes
    return apires.json();

}