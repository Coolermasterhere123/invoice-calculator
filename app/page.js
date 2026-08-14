'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // Company Settings
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyGST, setCompanyGST] = useState('');
  
  // Inventory
  const [inventory, setInventory] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  
  // Job
  const [jobItems, setJobItems] = useState([]);
  const [selectedInventoryItem, setSelectedInventoryItem] = useState('');
  const [jobItemQuantity, setJobItemQuantity] = useState('');
  const [jobName, setJobName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [showMaterialsInBilling, setShowMaterialsInBilling] = useState(true);
  const [invoiceDueDays, setInvoiceDueDays] = useState(15);
  const [editingClient, setEditingClient] = useState(false);
  
  // Labor
  const [laborHours, setLaborHours] = useState(0);
  const [laborRate, setLaborRate] = useState(75);
  const [afterHoursHours, setAfterHoursHours] = useState(0);
  const [afterHoursRate, setAfterHoursRate] = useState(112.5);
  
  // Travel
  const [travelKm, setTravelKm] = useState(0);
  const [kmRate, setKmRate] = useState(0.55);
  const [travelTime, setTravelTime] = useState(0);
  const [travelTimeRate, setTravelTimeRate] = useState(65);
  
  // Tax
  const [enablePST, setEnablePST] = useState(true);
  const [enableGST, setEnableGST] = useState(true);
  const [showPSTOnInvoice, setShowPSTOnInvoice] = useState(true);
  const [markup, setMarkup] = useState(1.3);
  
  // UI
  const [showNewJob, setShowNewJob] = useState(false);
  const [showInventoryManager, setShowInventoryManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      color: '#1f2937',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '8px',
    },
    subtitle: {
      color: '#6b7280',
      fontSize: '1.1rem',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '24px',
      marginBottom: '20px',
      border: '1px solid #e5e7eb',
    },
    cardTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      marginBottom: '16px',
      color: '#374151',
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
    },
    input: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none',
      width: '100%',
    },
    textarea: {
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.2s',
      outline: 'none',
      width: '100%',
      minHeight: '60px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    button: {
      padding: '8px 20px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      height: '42px',
      alignSelf: 'end',
    },
    buttonSecondary: {
      padding: '8px 16px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    buttonOutline: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      color: '#3b82f6',
      border: '1px solid #3b82f6',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    buttonSuccess: {
      padding: '8px 20px',
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      height: '42px',
    },
    buttonWarning: {
      padding: '8px 16px',
      backgroundColor: '#f59e0b',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '8px',
      borderBottom: '2px solid #e5e7eb',
      fontWeight: '600',
      color: '#4b5563',
      fontSize: '0.875rem',
    },
    td: {
      padding: '8px',
      borderBottom: '1px solid #e5e7eb',
      color: '#1f2937',
      fontSize: '0.875rem',
    },
    invoiceLine: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0',
      borderBottom: '1px solid #e5e7eb',
    },
    invoiceLineTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '2px solid #1f2937',
      fontWeight: 'bold',
      fontSize: '1.1rem',
    },
    invoiceLabel: {
      fontWeight: '500',
      color: '#4b5563',
    },
    invoiceValue: {
      fontWeight: '600',
      color: '#1f2937',
    },
    invoiceValueTotal: {
      fontWeight: '700',
      color: '#059669',
      fontSize: '1.2rem',
    },
    toggleRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px',
      cursor: 'pointer',
    },
    toggleSwitch: {
      position: 'relative',
      display: 'inline-block',
      width: '40px',
      height: '22px',
      cursor: 'pointer',
      flexShrink: 0,
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0,
      position: 'absolute',
    },
    toggleSlider: {
      position: 'absolute',
      cursor: 'pointer',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#ccc',
      transition: '0.3s',
      borderRadius: '22px',
    },
    toggleSliderActive: {
      backgroundColor: '#3b82f6',
    },
    toggleKnob: {
      position: 'absolute',
      height: '16px',
      width: '16px',
      left: '3px',
      bottom: '3px',
      backgroundColor: 'white',
      transition: '0.3s',
      borderRadius: '50%',
    },
    toggleKnobActive: {
      transform: 'translateX(18px)',
    },
    toggleLabel: {
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#4b5563',
      cursor: 'pointer',
    },
    taxBadge: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: '10px',
      fontSize: '0.7rem',
      fontWeight: '600',
      marginLeft: '4px',
    },
    taxBadgeActive: {
      backgroundColor: '#dbeafe',
      color: '#1e40af',
    },
    taxBadgeInactive: {
      backgroundColor: '#f3f4f6',
      color: '#9ca3af',
    },
    jobSelector: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '16px',
    },
    jobTag: {
      display: 'inline-block',
      backgroundColor: '#e5e7eb',
      color: '#374151',
      padding: '8px 16px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    jobTagActive: {
      backgroundColor: '#3b82f6',
      color: 'white',
    },
    inlineFlex: {
      display: 'flex',
      gap: '12px',
      alignItems: 'end',
      flexWrap: 'wrap',
    },
    emptyState: {
      textAlign: 'center',
      color: '#9ca3af',
      padding: '40px 0',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      marginTop: '16px',
      flexWrap: 'wrap',
    },
    inventoryItem: {
      display: 'inline-block',
      backgroundColor: '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '0.875rem',
      margin: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    markupButtons: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
    },
    markupButton: {
      padding: '6px 16px',
      border: '2px solid #d1d5db',
      borderRadius: '6px',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'all 0.2s',
    },
    markupButtonActive: {
      padding: '6px 16px',
      border: '2px solid #3b82f6',
      borderRadius: '6px',
      backgroundColor: '#3b82f6',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '500',
    },
    markupSection: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      marginBottom: '16px',
      padding: '12px',
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      flexWrap: 'wrap',
    },
    invoiceBox: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '16px',
    },
    settingsBox: {
      backgroundColor: '#f0f9ff',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '16px',
      border: '1px solid #bae6fd',
    },
    clientBox: {
      backgroundColor: '#f5f3ff',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '16px',
      border: '1px solid #ddd6fe',
    },
    headerInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'start',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      flexWrap: 'wrap',
    },
    headerLeft: {
      flex: 1,
    },
    headerRight: {
      textAlign: 'right',
    },
    // Invoice styles - optimized for printing
    invoiceContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontSize: '12px',
    },
    invoiceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '2px solid #1f2937',
    },
    invoiceHeaderLeft: {
      flex: 1,
    },
    invoiceHeaderRight: {
      textAlign: 'right',
      flexShrink: 0,
      marginLeft: '20px',
    },
    invoiceCompany: {
      fontSize: '10px',
      color: '#4b5563',
      lineHeight: '1.5',
    },
    invoiceClient: {
      marginBottom: '15px',
      padding: '12px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
    },
    invoiceClientLabel: {
      fontSize: '9px',
      fontWeight: '600',
      color: '#6b7280',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      marginBottom: '2px',
    },
    invoiceTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
      fontSize: '11px',
    },
    invoiceTh: {
      textAlign: 'left',
      padding: '6px 8px',
      borderBottom: '2px solid #1f2937',
      fontWeight: '600',
      color: '#4b5563',
      fontSize: '9px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    invoiceTd: {
      padding: '6px 8px',
      borderBottom: '1px solid #e5e7eb',
      color: '#1f2937',
      fontSize: '11px',
    },
    invoiceTotals: {
      marginTop: '12px',
      paddingTop: '10px',
      borderTop: '2px solid #1f2937',
      fontSize: '11px',
    },
    invoiceTotalLine: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px 0',
      fontSize: '11px',
    },
    invoiceGrandTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 0 2px 0',
      borderTop: '2px solid #1f2937',
      marginTop: '6px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    invoiceFooter: {
      marginTop: '20px',
      paddingTop: '12px',
      borderTop: '1px solid #e5e7eb',
      fontSize: '9px',
      color: '#6b7280',
      textAlign: 'center',
    },
    invoiceNumber: {
      fontSize: '10px',
      color: '#6b7280',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
      overflow: 'auto',
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      maxWidth: '850px',
      width: '100%',
      maxHeight: '95vh',
      overflow: 'auto',
      padding: '20px',
    },
    modalClose: {
      position: 'sticky',
      top: 0,
      float: 'right',
      background: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 14px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      zIndex: 10,
    },
    printButton: {
      position: 'sticky',
      top: 0,
      float: 'right',
      marginRight: '10px',
      background: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 14px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      zIndex: 10,
    },
    emailButton: {
      position: 'sticky',
      top: 0,
      float: 'right',
      marginRight: '10px',
      background: '#059669',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 14px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '500',
      zIndex: 10,
    },
    // Page break styles
    pageBreak: {
      pageBreakBefore: 'always',
      borderTop: '2px dashed #e5e7eb',
      marginTop: '20px',
      paddingTop: '20px',
    },
    pageBreakNote: {
      textAlign: 'center',
      fontSize: '11px',
      color: '#6b7280',
      fontStyle: 'italic',
      padding: '10px 0',
      borderTop: '1px solid #e5e7eb',
      marginTop: '10px',
    },
  };

  // Load saved data
  useEffect(() => {
    const settingsData = localStorage.getItem('companySettings');
    if (settingsData) {
      const settings = JSON.parse(settingsData);
      setCompanyName(settings.name || '');
      setCompanyAddress(settings.address || '');
      setCompanyPhone(settings.phone || '');
      setCompanyEmail(settings.email || '');
      setCompanyGST(settings.gst || '');
      setShowMaterialsInBilling(settings.showMaterials !== undefined ? settings.showMaterials : true);
      setShowPSTOnInvoice(settings.showPST !== undefined ? settings.showPST : true);
      setInvoiceDueDays(settings.invoiceDueDays || 15);
    }
    
    const inventoryData = localStorage.getItem('inventory');
    if (inventoryData) {
      setInventory(JSON.parse(inventoryData));
    }
    
    const savedJobsData = localStorage.getItem('savedJobs');
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData));
    }
    
    const currentJobData = localStorage.getItem('currentJob');
    if (currentJobData) {
      setCurrentJob(JSON.parse(currentJobData));
    }
  }, []);

  // Save data
  useEffect(() => {
    const settings = {
      name: companyName,
      address: companyAddress,
      phone: companyPhone,
      email: companyEmail,
      gst: companyGST,
      showMaterials: showMaterialsInBilling,
      showPST: showPSTOnInvoice,
      invoiceDueDays: invoiceDueDays
    };
    localStorage.setItem('companySettings', JSON.stringify(settings));
  }, [companyName, companyAddress, companyPhone, companyEmail, companyGST, showMaterialsInBilling, showPSTOnInvoice, invoiceDueDays]);

  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  useEffect(() => {
    if (savedJobs.length > 0) {
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }
  }, [savedJobs]);

  useEffect(() => {
    if (currentJob) {
      localStorage.setItem('currentJob', JSON.stringify(currentJob));
    }
  }, [currentJob]);

  const addToInventory = () => {
    if (newItemName && newItemCost) {
      const newItem = {
        id: Date.now(),
        name: newItemName,
        cost: parseFloat(newItemCost)
      };
      setInventory([...inventory, newItem]);
      setNewItemName('');
      setNewItemCost('');
    }
  };

  const removeFromInventory = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const addItemToJob = () => {
    if (selectedInventoryItem && jobItemQuantity && parseInt(jobItemQuantity) > 0) {
      const inventoryItem = inventory.find(item => item.name === selectedInventoryItem);
      if (inventoryItem) {
        const existingItem = jobItems.find(item => item.name === selectedInventoryItem);
        if (existingItem) {
          setJobItems(jobItems.map(item => 
            item.name === selectedInventoryItem 
              ? { ...item, quantity: item.quantity + parseInt(jobItemQuantity) }
              : item
          ));
        } else {
          setJobItems([...jobItems, {
            id: Date.now(),
            name: inventoryItem.name,
            cost: inventoryItem.cost,
            quantity: parseInt(jobItemQuantity)
          }]);
        }
        setJobItemQuantity('');
        setSelectedInventoryItem('');
      }
    }
  };

  const removeItemFromJob = (id) => {
    setJobItems(jobItems.filter(item => item.id !== id));
  };

  const updateJobItemQuantity = (id, quantity) => {
    const val = parseInt(quantity);
    if (val > 0) {
      setJobItems(jobItems.map(item => 
        item.id === id ? { ...item, quantity: val } : item
      ));
    } else if (quantity === '') {
      setJobItems(jobItems.map(item => 
        item.id === id ? { ...item, quantity: 0 } : item
      ));
    }
  };

  const createNewJob = () => {
    if (!jobName.trim() || !clientName.trim()) {
      alert('Please enter both a job name and client name');
      return;
    }
    const newJob = {
      id: Date.now(),
      name: jobName,
      clientName: clientName,
      clientAddress: clientAddress,
      clientContact: clientContact,
      clientEmail: clientEmail,
      items: [],
      laborHours: 0,
      laborRate: 75,
      afterHoursHours: 0,
      afterHoursRate: 112.5,
      travelKm: 0,
      kmRate: 0.55,
      travelTime: 0,
      travelTimeRate: 65,
      enablePST: true,
      enableGST: true,
      markup: 1.3,
      showMaterials: true,
      invoiceDueDays: invoiceDueDays,
      createdAt: new Date().toISOString()
    };
    setSavedJobs([...savedJobs, newJob]);
    loadJob(newJob);
    setJobName('');
    setClientName('');
    setClientAddress('');
    setClientContact('');
    setClientEmail('');
    setShowNewJob(false);
  };

  const loadJob = (job) => {
    setCurrentJob(job);
    setJobItems(job.items || []);
    setLaborHours(job.laborHours || 0);
    setLaborRate(job.laborRate || 75);
    setAfterHoursHours(job.afterHoursHours || 0);
    setAfterHoursRate(job.afterHoursRate || 112.5);
    setTravelKm(job.travelKm || 0);
    setKmRate(job.kmRate || 0.55);
    setTravelTime(job.travelTime || 0);
    setTravelTimeRate(job.travelTimeRate || 65);
    setEnablePST(job.enablePST !== undefined ? job.enablePST : true);
    setEnableGST(job.enableGST !== undefined ? job.enableGST : true);
    setMarkup(job.markup || 1.3);
    setShowMaterialsInBilling(job.showMaterials !== undefined ? job.showMaterials : true);
    setInvoiceDueDays(job.invoiceDueDays || 15);
    setClientEmail(job.clientEmail || '');
    setClientName(job.clientName || '');
    setClientAddress(job.clientAddress || '');
    setClientContact(job.clientContact || '');
    setEditingClient(false);
  };

  const saveCurrentJob = () => {
    if (!currentJob) return;
    const updatedJob = {
      ...currentJob,
      items: jobItems,
      laborHours: laborHours,
      laborRate: laborRate,
      afterHoursHours: afterHoursHours,
      afterHoursRate: afterHoursRate,
      travelKm: travelKm,
      kmRate: kmRate,
      travelTime: travelTime,
      travelTimeRate: travelTimeRate,
      enablePST: enablePST,
      enableGST: enableGST,
      markup: markup,
      showMaterials: showMaterialsInBilling,
      invoiceDueDays: invoiceDueDays,
      clientEmail: clientEmail,
      clientName: clientName,
      clientAddress: clientAddress,
      clientContact: clientContact
    };
    setSavedJobs(savedJobs.map(job => 
      job.id === currentJob.id ? updatedJob : job
    ));
    setCurrentJob(updatedJob);
    setEditingClient(false);
  };

  const deleteJob = (jobId) => {
    if (confirm('Delete this job?')) {
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
      if (currentJob?.id === jobId) {
        setCurrentJob(null);
        setJobItems([]);
      }
    }
  };

  const calculateTotals = () => {
    let materialsCost = jobItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
    let materialsWithMarkup = materialsCost * markup;
    let profitAmount = materialsWithMarkup - materialsCost;
    let pstAmount = enablePST ? materialsWithMarkup * 0.07 : 0;
    let materialsTotalWithMarkupAndPST = materialsWithMarkup + pstAmount;
    let laborTotal = (laborHours * laborRate) + (afterHoursHours * afterHoursRate);
    let gstBase = materialsTotalWithMarkupAndPST + laborTotal;
    let gstAmount = enableGST ? gstBase * 0.05 : 0;
    let kmTotal = travelKm * kmRate;
    let travelTimeTotal = travelTime * travelTimeRate;
    let grandTotal = materialsTotalWithMarkupAndPST + laborTotal + gstAmount + kmTotal + travelTimeTotal;
    
    return {
      materialsCost,
      materialsWithMarkup,
      profitAmount,
      pstAmount,
      materialsTotalWithMarkupAndPST,
      laborTotal,
      gstBase,
      gstAmount,
      kmTotal,
      travelTimeTotal,
      grandTotal
    };
  };

  const totals = calculateTotals();

  useEffect(() => {
    if (currentJob) {
      saveCurrentJob();
    }
  }, [jobItems, laborHours, laborRate, afterHoursHours, afterHoursRate, travelKm, kmRate, travelTime, travelTimeRate, enablePST, enableGST, markup, showMaterialsInBilling, invoiceDueDays]);

  const markupOptions = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];

  // Generate invoice number
  const getInvoiceNumber = () => {
    if (!currentJob) return 'INV-0001';
    const date = new Date(currentJob.createdAt || Date.now());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const id = String(currentJob.id).slice(-4);
    return 'INV-' + year + month + day + '-' + id;
  };

  // Calculate due date
  const getDueDate = () => {
    const date = new Date(currentJob?.createdAt || Date.now());
    date.setDate(date.getDate() + invoiceDueDays);
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle print - fixed to avoid multiple copies
  const handlePrint = () => {
    const printContent = document.getElementById('invoice-print');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<html><head><title>Invoice</title>');
      printWindow.document.write('<style>');
      printWindow.document.write('body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }');
      printWindow.document.write('@media print { body * { visibility: visible; } }');
      printWindow.document.write('</style></head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  // Handle email - simplified, no PDF attachment
  const handleEmail = () => {
    if (!currentJob) return;
    if (!clientEmail) {
      alert('Please add a client email address. Click the "Edit Client Info" button to add it.');
      return;
    }
    
    const invoiceNumber = getInvoiceNumber();
    const dueDate = getDueDate();
    const date = new Date(currentJob.createdAt || Date.now()).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Build email subject
    const subject = 'Invoice ' + invoiceNumber + ' - ' + currentJob.name;
    
    // Build email body as a nice text invoice
    let bodyLines = [];
    bodyLines.push('Dear ' + clientName + ',');
    bodyLines.push('');
    bodyLines.push('Please find your invoice below:');
    bodyLines.push('');
    bodyLines.push('='.repeat(50));
    bodyLines.push('INVOICE');
    bodyLines.push('='.repeat(50));
    bodyLines.push('');
    bodyLines.push('Invoice #: ' + invoiceNumber);
    bodyLines.push('Date: ' + date);
    bodyLines.push('Due Date: ' + dueDate);
    bodyLines.push('Job: ' + currentJob.name);
    bodyLines.push('');
    bodyLines.push('-' .repeat(30));
    bodyLines.push('BILL TO:');
    bodyLines.push(clientName);
    if (clientAddress) bodyLines.push(clientAddress);
    if (clientContact) bodyLines.push('Contact: ' + clientContact);
    if (clientEmail) bodyLines.push('Email: ' + clientEmail);
    bodyLines.push('');
    bodyLines.push('-' .repeat(30));
    bodyLines.push('ITEMS:');
    jobItems.forEach(item => {
      bodyLines.push('  ' + item.quantity + 'x ' + item.name);
    });
    bodyLines.push('');
    bodyLines.push('-' .repeat(30));
    bodyLines.push('CHARGES:');
    bodyLines.push('  Subtotal (Items):        $' + totals.materialsWithMarkup.toFixed(2));
    if (enablePST && totals.pstAmount > 0 && showPSTOnInvoice) {
      bodyLines.push('  PST (7%):                $' + totals.pstAmount.toFixed(2));
    }
    if (laborHours > 0 || afterHoursHours > 0) {
      bodyLines.push('  Labor:                   $' + totals.laborTotal.toFixed(2));
    }
    if (travelKm > 0) {
      bodyLines.push('  Travel KM:               $' + totals.kmTotal.toFixed(2));
    }
    if (travelTime > 0) {
      bodyLines.push('  Travel Time:             $' + totals.travelTimeTotal.toFixed(2));
    }
    if (enableGST && totals.gstAmount > 0) {
      bodyLines.push('  GST (5%):                $' + totals.gstAmount.toFixed(2));
    }
    bodyLines.push('  ' .repeat(25) + '---------');
    bodyLines.push('  TOTAL:                   $' + totals.grandTotal.toFixed(2));
    bodyLines.push('');
    bodyLines.push('=' .repeat(50));
    bodyLines.push('');
    bodyLines.push('Thank you for your business!');
    if (companyName) {
      bodyLines.push(companyName);
    }
    if (companyPhone) {
      bodyLines.push('Phone: ' + companyPhone);
    }
    if (companyEmail) {
      bodyLines.push('Email: ' + companyEmail);
    }
    if (companyGST) {
      bodyLines.push('GST#: ' + companyGST);
    }
    bodyLines.push('');
    bodyLines.push('To print this invoice as PDF, use the Print button in the invoice view.');
    
    const body = bodyLines.join('\n');
    
    // Encode for mailto
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // Open mailto link
    window.location.href = 'mailto:' + clientEmail + '?subject=' + encodedSubject + '&body=' + encodedBody;
  };

  // Invoice component - optimized for printing
  const InvoiceView = ({ onClose }) => {
    const invoiceNumber = getInvoiceNumber();
    const date = new Date(currentJob?.createdAt || Date.now()).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const dueDate = getDueDate();

    // Calculate item totals for display - only show quantities
    const itemizedItems = jobItems.map(item => ({
      name: item.name,
      quantity: item.quantity
    }));

    const totalLaborHours = laborHours + afterHoursHours;
    const hasLabor = totalLaborHours > 0;
    const hasTravel = travelKm > 0 || travelTime > 0;

    // Calculate labor breakdown
    let laborBreakdown = '';
    if (laborHours > 0 && afterHoursHours > 0) {
      laborBreakdown = laborHours + 'h @ $' + laborRate + '/h + ' + afterHoursHours + 'h @ $' + afterHoursRate + '/h';
    } else if (laborHours > 0) {
      laborBreakdown = laborHours + 'h @ $' + laborRate + '/h';
    } else if (afterHoursHours > 0) {
      laborBreakdown = afterHoursHours + 'h @ $' + afterHoursRate + '/h';
    }

    // Get totals values for display with concatenation
    const subtotalItemsDisplay = '$ ' + totals.materialsWithMarkup.toFixed(2);
    const laborTotalDisplay = '$ ' + totals.laborTotal.toFixed(2);
    const kmTotalDisplay = '$ ' + totals.kmTotal.toFixed(2);
    const travelTimeTotalDisplay = '$ ' + totals.travelTimeTotal.toFixed(2);
    const pstAmountDisplay = '$ ' + totals.pstAmount.toFixed(2);
    const gstAmountDisplay = '$ ' + totals.gstAmount.toFixed(2);
    const grandTotalDisplay = '$ ' + totals.grandTotal.toFixed(2);

    // Determine if we need page 2 for items (more than 12 items)
    const needsPage2 = itemizedItems.length > 12;

    // Page 1 items (first 12)
    const page1Items = itemizedItems.slice(0, 12);
    const page2Items = itemizedItems.slice(12);

    return (
      <div style={styles.modalOverlay} onClick={onClose}>
        <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <button style={styles.printButton} onClick={handlePrint}>🖨️ Print</button>
          <button style={styles.emailButton} onClick={handleEmail}>
            ✉️ Email Invoice
          </button>
          <button style={styles.modalClose} onClick={onClose}>✕ Close</button>
          
          <div style={styles.invoiceContainer} id="invoice-print">
            {/* PAGE 1 */}
            <div>
              {/* Invoice Header - Company Address in upper right */}
              <div style={styles.invoiceHeader}>
                <div style={styles.invoiceHeaderLeft}>
                  <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>INVOICE</h1>
                  <div style={styles.invoiceNumber}># {invoiceNumber}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>Date: {date}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>Due: {dueDate}</div>
                </div>
                <div style={styles.invoiceHeaderRight}>
                  {companyName && <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#1f2937' }}>{companyName}</div>}
                  {companyAddress && <div style={{ fontSize: '10px', color: '#4b5563' }}>{companyAddress}</div>}
                  {companyPhone && <div style={{ fontSize: '10px', color: '#4b5563' }}>{companyPhone}</div>}
                  {companyEmail && <div style={{ fontSize: '10px', color: '#4b5563' }}>{companyEmail}</div>}
                  {companyGST && <div style={{ fontSize: '10px', color: '#4b5563' }}><strong>GST#:</strong> {companyGST}</div>}
                </div>
              </div>

              {/* Client Info */}
              <div style={styles.invoiceClient}>
                <div style={styles.invoiceClientLabel}>Bill To</div>
                <div style={{ fontWeight: '600', fontSize: '13px', color: '#1f2937' }}>{currentJob?.clientName}</div>
                {currentJob?.clientAddress && <div style={{ color: '#4b5563', fontSize: '11px' }}>{currentJob.clientAddress}</div>}
                {currentJob?.clientContact && <div style={{ color: '#4b5563', fontSize: '11px' }}>{currentJob.clientContact}</div>}
                {currentJob?.clientEmail && <div style={{ color: '#4b5563', fontSize: '11px' }}>{currentJob.clientEmail}</div>}
              </div>

              {/* Items Table - Page 1 (first 12 items) */}
              <table style={styles.invoiceTable}>
                <thead>
                  <tr>
                    <th style={styles.invoiceTh}>Item</th>
                    <th style={styles.invoiceTh} style={{ textAlign: 'center' }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {page1Items.map((item, index) => (
                    <tr key={index}>
                      <td style={styles.invoiceTd}>{item.name}</td>
                      <td style={{ ...styles.invoiceTd, textAlign: 'center' }}>{item.quantity}</td>
                    </tr>
                  ))}
                  {page1Items.length === 0 && (
                    <tr>
                      <td colSpan="2" style={{ ...styles.invoiceTd, textAlign: 'center', color: '#9ca3af' }}>No items</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {needsPage2 && (
                <div style={styles.pageBreakNote}>
                  *** {itemizedItems.length - 12} more item(s) continued on page 2 ***
                </div>
              )}

              {/* Labor Section */}
              {hasLabor && (
                <div style={{ marginTop: '12px', padding: '8px 0', borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span><strong>Labor:</strong> {laborBreakdown}</span>
                    <span><strong>{laborTotalDisplay}</strong></span>
                  </div>
                </div>
              )}

              {/* Travel Section */}
              {hasTravel && (
                <div style={{ padding: '4px 0', fontSize: '11px' }}>
                  {travelKm > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Travel: {travelKm} km @ $ {kmRate}/km</span>
                      <span>{kmTotalDisplay}</span>
                    </div>
                  )}
                  {travelTime > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Travel Time: {travelTime}h @ $ {travelTimeRate}/h</span>
                      <span>{travelTimeTotalDisplay}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Totals */}
              <div style={styles.invoiceTotals}>
                <div style={styles.invoiceTotalLine}>
                  <span>Subtotal (Items)</span>
                  <span>{subtotalItemsDisplay}</span>
                </div>
                
                {/* PST - Only show if enabled AND showPSTOnInvoice is true */}
                {enablePST && totals.pstAmount > 0 && showPSTOnInvoice && (
                  <div style={styles.invoiceTotalLine}>
                    <span>PST (7%)</span>
                    <span>{pstAmountDisplay}</span>
                  </div>
                )}

                {enableGST && totals.gstAmount > 0 && (
                  <div style={styles.invoiceTotalLine}>
                    <span>GST (5%)</span>
                    <span>{gstAmountDisplay}</span>
                  </div>
                )}

                <div style={styles.invoiceGrandTotal}>
                  <span>TOTAL</span>
                  <span>{grandTotalDisplay}</span>
                </div>
              </div>

              {/* Footer */}
              <div style={styles.invoiceFooter}>
                <p>Thank you for your business!</p>
                {companyName && <p style={{ fontSize: '8px', marginTop: '2px' }}>{companyName}</p>}
                {companyGST && <p style={{ fontSize: '8px' }}>GST#: {companyGST}</p>}
              </div>
            </div>

            {/* PAGE 2 - Items continuation */}
            {needsPage2 && (
              <div style={styles.pageBreak}>
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Items Used - Page 2</h2>
                  <p style={{ fontSize: '10px', color: '#6b7280' }}>Invoice # {invoiceNumber}</p>
                </div>
                <table style={styles.invoiceTable}>
                  <thead>
                    <tr>
                      <th style={styles.invoiceTh}>Item</th>
                      <th style={styles.invoiceTh} style={{ textAlign: 'center' }}>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page2Items.map((item, index) => (
                      <tr key={index}>
                        <td style={styles.invoiceTd}>{item.name}</td>
                        <td style={{ ...styles.invoiceTd, textAlign: 'center' }}>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={styles.invoiceFooter}>
                  <p style={{ fontSize: '8px', color: '#6b7280' }}>Page 2 of 2</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📄 Job Invoice Calculator</h1>
        <p style={styles.subtitle}>Markup on Materials Only • PST on Materials • GST on Materials + Labor</p>
      </div>

      {/* Settings Button */}
      <div style={{ marginBottom: '20px' }}>
        <button style={styles.buttonOutline} onClick={() => setShowSettings(!showSettings)}>
          ⚙️ {showSettings ? 'Hide Settings' : 'Company Settings'}
        </button>
      </div>

      {/* Settings Section */}
      {showSettings && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Company Settings</h2>
          <div style={styles.settingsBox}>
            <div style={styles.grid2}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Company Name</label>
                <input style={styles.input} type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Your Company Name" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone</label>
                <input style={styles.input} type="text" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} placeholder="(555) 555-5555" />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Address</label>
              <textarea style={styles.textarea} value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} placeholder="123 Main St, City, Province, Postal Code" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} type="email" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} placeholder="info@yourcompany.com" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>GST Number</label>
              <input style={styles.input} type="text" value={companyGST} onChange={(e) => setCompanyGST(e.target.value)} placeholder="GST-123456789" />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Default Invoice Due (days)</label>
              <input style={styles.input} type="number" min="1" max="90" value={invoiceDueDays} onChange={(e) => setInvoiceDueDays(parseInt(e.target.value) || 15)} placeholder="15" />
            </div>
          </div>
        </div>
      )}

      {/* Inventory Management */}
      <div style={styles.card}>
        <div style={styles.inlineFlex}>
          <h2 style={styles.cardTitle}>Inventory</h2>
          <button style={styles.buttonOutline} onClick={() => setShowInventoryManager(!showInventoryManager)}>
            {showInventoryManager ? 'Hide Manager' : 'Manage Inventory'}
          </button>
        </div>
        {showInventoryManager && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Item Name</label>
                <input style={styles.input} type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} placeholder="e.g., Cabinet" onKeyPress={(e) => e.key === 'Enter' && addToInventory()} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Cost ($)</label>
                <input style={styles.input} type="number" step="0.01" min="0" value={newItemCost} onChange={(e) => setNewItemCost(e.target.value)} placeholder="0.00" onKeyPress={(e) => e.key === 'Enter' && addToInventory()} />
              </div>
              <button style={styles.button} onClick={addToInventory}>Add Item</button>
            </div>
            {inventory.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                {inventory.map(item => (
                  <span key={item.id} style={styles.inventoryItem}>
                    {item.name} (${item.cost.toFixed(2)})
                    <button style={{ background: 'none', border: 'none', marginLeft: '6px', cursor: 'pointer', color: '#ef4444', fontSize: '0.75rem' }} onClick={() => removeFromInventory(item.id)}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Job Management */}
      <div style={styles.card}>
        <div style={styles.inlineFlex}>
          <h2 style={styles.cardTitle}>Jobs</h2>
          <button style={styles.buttonSuccess} onClick={() => setShowNewJob(!showNewJob)}>
            {showNewJob ? 'Cancel' : '+ New Job'}
          </button>
        </div>
        {showNewJob && (
          <div style={{ marginBottom: '16px' }}>
            <div style={styles.grid2}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Job Name *</label>
                <input style={styles.input} type="text" value={jobName} onChange={(e) => setJobName(e.target.value)} placeholder="e.g., Smith Residence - Kitchen" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Client Name *</label>
                <input style={styles.input} type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Smith" />
              </div>
            </div>
            <div style={{ marginTop: '12px' }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Client Address</label>
                <textarea style={styles.textarea} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="123 Client St, City, Province" />
              </div>
            </div>
            <div style={styles.grid2}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Contact Person / Phone</label>
                <input style={styles.input} type="text" value={clientContact} onChange={(e) => setClientContact(e.target.value)} placeholder="Jane Doe - (555) 555-5555" />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Client Email</label>
                <input style={styles.input} type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@email.com" />
              </div>
            </div>
            <div style={{ ...styles.inlineFlex, marginTop: '12px' }}>
              <button style={styles.button} onClick={createNewJob}>Create Job</button>
            </div>
          </div>
        )}
        {savedJobs.length > 0 && (
          <div style={styles.jobSelector}>
            {savedJobs.map(job => (
              <span key={job.id} style={{ ...styles.jobTag, ...(currentJob?.id === job.id ? styles.jobTagActive : {}) }} onClick={() => loadJob(job)}>
                {job.name} - {job.clientName}
                <button style={{ background: 'none', border: 'none', marginLeft: '8px', cursor: 'pointer', color: currentJob?.id === job.id ? 'white' : '#6b7280', fontSize: '0.75rem' }} onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}>×</button>
              </span>
            ))}
          </div>
        )}
        {!currentJob && savedJobs.length === 0 && (
          <div style={styles.emptyState}><p>No jobs yet. Create your first job above!</p></div>
        )}
      </div>

      {currentJob && (
        <>
          {/* Job Header Info with Edit Client Button */}
          <div style={styles.card}>
            <div style={styles.headerInfo}>
              <div style={styles.headerLeft}>
                <h3 style={{ margin: 0, color: '#1f2937' }}>{currentJob.name}</h3>
                <div style={{ color: '#4b5563', marginTop: '4px' }}>
                  <strong>Client:</strong> {currentJob.clientName}
                  {currentJob.clientContact && <span> • {currentJob.clientContact}</span>}
                </div>
                {currentJob.clientAddress && (
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>{currentJob.clientAddress}</div>
                )}
                {currentJob.clientEmail && (
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>📧 {currentJob.clientEmail}</div>
                )}
              </div>
              <div style={styles.headerRight}>
                {companyName && (
                  <>
                    <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{companyName}</div>
                    {companyAddress && <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{companyAddress}</div>}
                    {companyPhone && <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{companyPhone}</div>}
                    {companyEmail && <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{companyEmail}</div>}
                  </>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={styles.buttonOutline} onClick={() => setEditingClient(!editingClient)}>
                {editingClient ? 'Cancel Edit' : '✏️ Edit Client Info'}
              </button>
              <button style={{ ...styles.buttonSuccess, flex: 1 }} onClick={() => setShowInvoice(true)}>
                📄 View Final Invoice
              </button>
            </div>
            {!clientEmail && (
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                ⚠️ Add client email to enable email feature
              </div>
            )}
          </div>

          {/* Edit Client Info Section */}
          {editingClient && (
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Edit Client Information</h2>
              <div style={styles.clientBox}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Client Name *</label>
                  <input style={styles.input} type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="John Smith" />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Client Address</label>
                  <textarea style={styles.textarea} value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} placeholder="123 Client St, City, Province" />
                </div>
                <div style={styles.grid2}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Contact Person / Phone</label>
                    <input style={styles.input} type="text" value={clientContact} onChange={(e) => setClientContact(e.target.value)} placeholder="Jane Doe - (555) 555-5555" />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Client Email</label>
                    <input style={styles.input} type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@email.com" />
                  </div>
                </div>
                <div style={{ ...styles.inlineFlex, marginTop: '12px' }}>
                  <button style={styles.buttonSuccess} onClick={saveCurrentJob}>Save Client Info</button>
                  <button style={styles.buttonOutline} onClick={() => setEditingClient(false)}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Job Builder - Items */}
          <div style={styles.card}>
            <div style={styles.inlineFlex}>
              <h2 style={styles.cardTitle}>Job Builder - Materials</h2>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>Show Materials</span>
                <label style={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={showMaterialsInBilling} 
                    onChange={(e) => {
                      setShowMaterialsInBilling(e.target.checked);
                      if (currentJob) {
                        saveCurrentJob();
                      }
                    }} 
                    style={styles.toggleInput} 
                  />
                  <span style={{ ...styles.toggleSlider, ...(showMaterialsInBilling ? styles.toggleSliderActive : {}) }}>
                    <span style={{ ...styles.toggleKnob, ...(showMaterialsInBilling ? styles.toggleKnobActive : {}) }} />
                  </span>
                </label>
                <span style={{ ...styles.taxBadge, ...(showMaterialsInBilling ? styles.taxBadgeActive : styles.taxBadgeInactive) }}>
                  {showMaterialsInBilling ? 'Visible' : 'Hidden'}
                </span>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Select Item</label>
                <select style={styles.input} value={selectedInventoryItem} onChange={(e) => setSelectedInventoryItem(e.target.value)}>
                  <option value="">Select an item...</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.name}>{item.name} (${item.cost.toFixed(2)})</option>
                  ))}
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Quantity</label>
                <input style={styles.input} type="number" min="1" step="1" value={jobItemQuantity} onChange={(e) => setJobItemQuantity(e.target.value)} placeholder="Qty" />
              </div>
              <button style={styles.button} onClick={addItemToJob}>Add to Job</button>
            </div>
            
            {jobItems.length > 0 && (
              <div style={{ marginTop: '12px' }}>
                <table style={styles.table}>
                  <thead><tr><th style={styles.th}>Item</th><th style={styles.th}>Cost</th><th style={styles.th}>Qty</th><th style={styles.th}>Total</th><th style={styles.th}>Action</th></tr></thead>
                  <tbody>
                    {jobItems.map((item) => (
                      <tr key={item.id}>
                        <td style={styles.td}>{item.name}</td>
                        <td style={styles.td}>$ {item.cost.toFixed(2)}</td>
                        <td style={styles.td}>
                          <input type="number" min="0" step="1" value={item.quantity || ''} onChange={(e) => updateJobItemQuantity(item.id, e.target.value)} style={{ ...styles.input, width: '60px', padding: '4px' }} />
                        </td>
                        <td style={styles.td}>$ {(item.cost * (item.quantity || 0)).toFixed(2)}</td>
                        <td style={styles.td}><button style={styles.buttonSecondary} onClick={() => removeItemFromJob(item.id)}>Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Labor & Travel */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Labor & Travel</h2>
            <div style={styles.grid2}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>👷 Labor (No Markup)</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Regular Hours</label>
                  <input style={styles.input} type="number" step="0.5" min="0" value={laborHours} onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Rate ($/hour)</label>
                  <input style={styles.input} type="number" step="1" min="0" value={laborRate} onChange={(e) => setLaborRate(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>After Hours</label>
                  <input style={styles.input} type="number" step="0.5" min="0" value={afterHoursHours} onChange={(e) => setAfterHoursHours(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>After Hours Rate ($/hour)</label>
                  <input style={styles.input} type="number" step="1" min="0" value={afterHoursRate} onChange={(e) => setAfterHoursRate(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '12px' }}>🚗 Travel</h3>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Distance (km)</label>
                  <input style={styles.input} type="number" step="0.1" min="0" value={travelKm} onChange={(e) => setTravelKm(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Rate ($/km)</label>
                  <input style={styles.input} type="number" step="0.01" min="0" value={kmRate} onChange={(e) => setKmRate(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Travel Time (hours)</label>
                  <input style={styles.input} type="number" step="0.5" min="0" value={travelTime} onChange={(e) => setTravelTime(parseFloat(e.target.value) || 0)} />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Travel Time Rate ($/hour)</label>
                  <input style={styles.input} type="number" step="1" min="0" value={travelTimeRate} onChange={(e) => setTravelTimeRate(parseFloat(e.target.value) || 0)} />
                </div>
              </div>
            </div>
          </div>

          {/* Tax Toggles */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Tax Settings</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>PST (7% on Materials after markup)</span>
                <label style={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={enablePST} 
                    onChange={(e) => setEnablePST(e.target.checked)} 
                    style={styles.toggleInput} 
                  />
                  <span style={{ ...styles.toggleSlider, ...(enablePST ? styles.toggleSliderActive : {}) }}>
                    <span style={{ ...styles.toggleKnob, ...(enablePST ? styles.toggleKnobActive : {}) }} />
                  </span>
                </label>
                <span style={{ ...styles.taxBadge, ...(enablePST ? styles.taxBadgeActive : styles.taxBadgeInactive) }}>
                  {enablePST ? 'On' : 'Off'}
                </span>
              </div>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>Show PST on Invoice</span>
                <label style={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={showPSTOnInvoice} 
                    onChange={(e) => setShowPSTOnInvoice(e.target.checked)} 
                    style={styles.toggleInput} 
                  />
                  <span style={{ ...styles.toggleSlider, ...(showPSTOnInvoice ? styles.toggleSliderActive : {}) }}>
                    <span style={{ ...styles.toggleKnob, ...(showPSTOnInvoice ? styles.toggleKnobActive : {}) }} />
                  </span>
                </label>
                <span style={{ ...styles.taxBadge, ...(showPSTOnInvoice ? styles.taxBadgeActive : styles.taxBadgeInactive) }}>
                  {showPSTOnInvoice ? 'Visible' : 'Hidden'}
                </span>
              </div>
              <div style={styles.toggleRow}>
                <span style={styles.toggleLabel}>GST (5% on Materials+PST+Labor)</span>
                <label style={styles.toggleSwitch}>
                  <input 
                    type="checkbox" 
                    checked={enableGST} 
                    onChange={(e) => setEnableGST(e.target.checked)} 
                    style={styles.toggleInput} 
                  />
                  <span style={{ ...styles.toggleSlider, ...(enableGST ? styles.toggleSliderActive : {}) }}>
                    <span style={{ ...styles.toggleKnob, ...(enableGST ? styles.toggleKnobActive : {}) }} />
                  </span>
                </label>
                <span style={{ ...styles.taxBadge, ...(enableGST ? styles.taxBadgeActive : styles.taxBadgeInactive) }}>
                  {enableGST ? 'On' : 'Off'}
                </span>
              </div>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '8px' }}>
              PST applied to Materials after markup • GST applied to (Materials + PST + Labor)
            </div>
          </div>

          {/* Markup Section */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Profit Markup (Applied to Materials Only)</h2>
            <div style={styles.markupSection}>
              <span style={{ fontWeight: '600', color: '#374151' }}>Select Markup:</span>
              <div style={styles.markupButtons}>
                {markupOptions.map((m) => (
                  <button key={m} style={markup === m ? styles.markupButtonActive : styles.markupButton} onClick={() => setMarkup(m)}>X{m}</button>
                ))}
              </div>
              <span style={{ marginLeft: 'auto', fontWeight: 'bold', color: '#3b82f6' }}>
                Current: X{markup}
              </span>
            </div>
          </div>

          {/* Invoice Summary */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Invoice Summary</h2>
            <div style={styles.invoiceBox}>
              
              {/* Materials Section - Only shown if toggle is ON */}
              {showMaterialsInBilling && (
                <>
                  <div style={styles.invoiceLine}>
                    <span style={styles.invoiceLabel}>📦 Materials Cost</span>
                    <span style={styles.invoiceValue}>$ {totals.materialsCost.toFixed(2)}</span>
                  </div>
                  <div style={styles.invoiceLine}>
                    <span style={styles.invoiceLabel}>📈 Markup (X{markup})</span>
                    <span style={styles.invoiceValue}>$ {totals.materialsWithMarkup.toFixed(2)}</span>
                  </div>
                  <div style={{ ...styles.invoiceLine, backgroundColor: '#fef3c7', borderRadius: '4px', padding: '8px 12px' }}>
                    <span style={{ fontWeight: '600', color: '#92400e' }}>💰 Profit on Materials</span>
                    <span style={{ fontWeight: '700', color: '#92400e' }}>$ {totals.profitAmount.toFixed(2)}</span>
                  </div>
                  <div style={styles.invoiceLine}>
                    <span style={styles.invoiceLabel}>🧾 PST (7%) {enablePST ? '✅' : '❌'}</span>
                    <span style={styles.invoiceValue}>$ {totals.pstAmount.toFixed(2)}</span>
                  </div>
                </>
              )}

              {/* Materials Total - Always show */}
              <div style={{ ...styles.invoiceLine, backgroundColor: '#dbeafe', borderRadius: '4px', padding: '8px 12px', borderBottom: '2px solid #3b82f6' }}>
                <span style={{ fontWeight: '700', color: '#1e40af' }}>📊 Materials Total (Markup + PST)</span>
                <span style={{ fontWeight: '700', color: '#1e40af', fontSize: '1.1rem' }}>$ {totals.materialsTotalWithMarkupAndPST.toFixed(2)}</span>
              </div>

              {/* Labor */}
              <div style={styles.invoiceLine}>
                <span style={styles.invoiceLabel}>👷 Labor ({laborHours + afterHoursHours}h @ ${laborRate}/h) - No Markup</span>
                <span style={styles.invoiceValue}>$ {totals.laborTotal.toFixed(2)}</span>
              </div>

              {/* GST Base */}
              <div style={{ ...styles.invoiceLine, backgroundColor: '#e0e7ff', borderRadius: '4px', padding: '8px 12px' }}>
                <span style={{ fontWeight: '600', color: '#3730a3' }}>📊 GST Base (Materials Total + Labor)</span>
                <span style={{ fontWeight: '600', color: '#3730a3' }}>$ {totals.gstBase.toFixed(2)}</span>
              </div>

              {/* GST */}
              <div style={styles.invoiceLine}>
                <span style={styles.invoiceLabel}>🧾 GST (5%) {enableGST ? '✅' : '❌'}</span>
                <span style={styles.invoiceValue}>$ {totals.gstAmount.toFixed(2)}</span>
              </div>

              {/* KM */}
              {travelKm > 0 && (
                <div style={styles.invoiceLine}>
                  <span style={styles.invoiceLabel}>🚗 Travel KM ({travelKm}km)</span>
                  <span style={styles.invoiceValue}>$ {totals.kmTotal.toFixed(2)}</span>
                </div>
              )}

              {/* Travel Time */}
              {travelTime > 0 && (
                <div style={styles.invoiceLine}>
                  <span style={styles.invoiceLabel}>⏱️ Travel Time ({travelTime}h)</span>
                  <span style={styles.invoiceValue}>$ {totals.travelTimeTotal.toFixed(2)}</span>
                </div>
              )}

              {/* Divider */}
              <div style={{ borderTop: '2px solid #1f2937', margin: '8px 0' }}></div>

              {/* Grand Total */}
              <div style={styles.invoiceLineTotal}>
                <span style={{ fontSize: '1.2rem' }}>💰 GRAND TOTAL</span>
                <span style={styles.invoiceValueTotal}>$ {totals.grandTotal.toFixed(2)}</span>
              </div>

              {/* Breakdown */}
              <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '8px', borderTop: '1px solid #e5e7eb', paddingTop: '8px' }}>
                {showMaterialsInBilling && (
                  <>
                    <div>Materials with markup: ${totals.materialsWithMarkup.toFixed(2)}</div>
                    <div>+ PST (7%): ${totals.pstAmount.toFixed(2)}</div>
                  </>
                )}
                <div style={{ fontWeight: '600', color: '#1e40af' }}>= Materials Total: ${totals.materialsTotalWithMarkupAndPST.toFixed(2)}</div>
                <div>+ Labor (no markup): ${totals.laborTotal.toFixed(2)}</div>
                <div style={{ fontWeight: '600', color: '#3730a3' }}>= GST Base: ${totals.gstBase.toFixed(2)}</div>
                <div>+ GST (5%): ${totals.gstAmount.toFixed(2)}</div>
                {travelKm > 0 && <div>+ KM: ${totals.kmTotal.toFixed(2)}</div>}
                {travelTime > 0 && <div>+ Travel Time: ${totals.travelTimeTotal.toFixed(2)}</div>}
                <div style={{ fontWeight: 'bold', color: '#1f2937' }}>= Grand Total: ${totals.grandTotal.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Invoice Modal */}
      {showInvoice && currentJob && (
        <InvoiceView onClose={() => setShowInvoice(false)} />
      )}
    </div>
  );
}