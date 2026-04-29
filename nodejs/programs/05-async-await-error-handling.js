async function getUser(userId) {
  if (!userId) {
    throw new Error('userId is required');
  }

  return {id: userId, name: 'Sumit'};
}

async function main() {
  try {
    const user = await getUser('u1');
    console.log(user);
  } catch (error) {
    console.error('Could not load user', error);
  }
}

main();

