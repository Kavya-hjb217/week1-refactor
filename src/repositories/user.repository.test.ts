//describe->grouping of related tests
//it->individual test case
//expect->assertions to verify outcomes
//beforeEach->setup code before each test



//every single it is counted as a separate test case


import { describe, it, expect, beforeEach } from 'vitest';
import { UserRepository } from './user.repository';//class imported for testing

describe('UserRepository', () => {
  let repo: UserRepository;// create a variable to hold the repository instance

  // Setup: Create a fresh repository before each test to ensure isolation
  beforeEach(() => {
    repo = new UserRepository();
  });//it runs before each test case and resets the map to ensure tests do not interfere with each other

  describe('create', () => {
    it('should create a valid user with a generated UUID', () => {//1st test case
      const result = repo.create({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('John Doe');
        expect(result.data.id).toBeDefined();
        // Check if ID is a valid UUID length (36 chars)
        expect(result.data.id.length).toBe(36);
      }
    });


    //invalid email test case
    it('should return InvalidEmail error for malformed emails', () => {//2nd test case
      const result = repo.create({
        name: 'John',
        email: 'not-an-email',
        age: 30
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('InvalidEmail');
      }
    });

    it('should return DuplicateEmail error if email is already registered', () => {//3rd test case
      const email = 'unique@example.com';
      // Create first user
      repo.create({ name: 'User 1', email, age: 25 });

      // Try to create second user with same email
      const result = repo.create({ name: 'User 2', email, age: 30 });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('DuplicateEmail');
      }
    });
  });

  describe('findById', () => {
    it('should find a user by their UUID', () => {//4th test case
      const creation = repo.create({ name: 'Alice', email: 'alice@test.com', age: 25 });
      
      if (creation.success) {
        const found = repo.findById(creation.data.id);
        expect(found.success).toBe(true);
        if (found.success) {
          expect(found.data.name).toBe('Alice');
        }
      }
    });

    it('should return UserNotFound for a non-existent UUID', () => {//5th test case
      const result = repo.findById(crypto.randomUUID());
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('UserNotFound');
      }
    });
  });

  describe('update', () => {
    it('should update user name and refresh updatedAt timestamp', async () => {//6th test case
      const creation = repo.create({ name: 'Original', email: 'test@test.com', age: 20 });
      
      if (creation.success) {
        const id = creation.data.id;
        const originalUpdateAt = creation.data.updatedAt.getTime();

        // Wait a small bit to ensure timestamp changes
        await new Promise(resolve => setTimeout(resolve, 10));

        const updateResult = repo.update(id, { name: 'Updated Name' });
        
        expect(updateResult.success).toBe(true);
        if (updateResult.success) {
          expect(updateResult.data.name).toBe('Updated Name');
          expect(updateResult.data.updatedAt.getTime()).toBeGreaterThan(originalUpdateAt);
        }
      }
    });
  });

  describe('delete', () => {
    it('should remove a user and return success', () => {//7th test case
      const creation = repo.create({ name: 'To Delete', email: 'del@test.com', age: 40 });
      
      if (creation.success) {
        const id = creation.data.id;
        const deleteResult = repo.delete(id);
        
        expect(deleteResult.success).toBe(true);
        // Verify user is actually gone
        expect(repo.findById(id).success).toBe(false);
      }
    });

    it('should return UserNotFound when deleting a non-existent user', () => {//8th test case
      const result = repo.delete('non-existent-id');
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBe('UserNotFound');
      }
    });
  });

  describe('getAll', () => {
    it('should return an empty array when no users exist', () => {//9th test case
      expect(repo.getAll().length).toBe(0);
    });

    it('should return all created users', () => {//10th test case
      repo.create({ name: 'User A', email: 'a@test.com', age: 20 });
      repo.create({ name: 'User B', email: 'b@test.com', age: 30 });
      
      const all = repo.getAll();
      expect(all.length).toBe(2);
      expect(all.map(u => u.name)).toContain('User A');
      expect(all.map(u => u.name)).toContain('User B');
    });
  });
});