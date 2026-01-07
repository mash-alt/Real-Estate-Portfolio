import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase-config';
import type { Property, TeamMember } from '../types';

// Collection references
const propertiesCollection = collection(db, 'listings');
const teamMembersCollection = collection(db, 'teamMembers');

// Property operations
export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const querySnapshot = await getDocs(propertiesCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Property;
    }
    return null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
};

export const getActiveProperties = async (): Promise<Property[]> => {
  try {
    const querySnapshot = await getDocs(propertiesCollection);
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Property))
      .filter(property => property.isActive !== false);
  } catch (error) {
    console.error('Error fetching active properties:', error);
    return [];
  }
};

export const getFeaturedProperties = async (): Promise<Property[]> => {
  try {
    const q = query(propertiesCollection, where('featured', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Property))
      .filter(property => property.isActive !== false);
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
};

export const addProperty = async (property: Omit<Property, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(propertiesCollection, property);
    return docRef.id;
  } catch (error) {
    console.error('Error adding property:', error);
    return null;
  }
};

export const updateProperty = async (id: string, property: Partial<Property>): Promise<boolean> => {
  try {
    const docRef = doc(db, 'listings', id);
    await updateDoc(docRef, property);
    return true;
  } catch (error) {
    console.error('Error updating property:', error);
    return false;
  }
};

export const deleteProperty = async (id: string): Promise<boolean> => {
  try {
    const docRef = doc(db, 'listings', id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting property:', error);
    return false;
  }
};

// Team Member operations
export const getAllTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const querySnapshot = await getDocs(teamMembersCollection);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as TeamMember));
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
};

export const addTeamMember = async (member: Omit<TeamMember, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(teamMembersCollection, member);
    return docRef.id;
  } catch (error) {
    console.error('Error adding team member:', error);
    return null;
  }
};
